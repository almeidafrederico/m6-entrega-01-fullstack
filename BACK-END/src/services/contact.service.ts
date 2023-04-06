import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contact.entity";
import { User } from "../entities/user.entity";
import {
  iContact,
  iContactResponse,
  iContactUpdate,
} from "../interfaces/contact";
import { decodeTokenIdUser } from "./token.service";

const contactRepository = AppDataSource.getRepository(Contact);

const createContactService = async (
  data: iContact,
  authToken: string
): Promise<[number, iContactResponse | { message: string }]> => {
  const { email, fullName, telephone } = data;
  try {
    const idUserToken = decodeTokenIdUser(authToken);

    const user = await AppDataSource.getRepository(User).findOneBy({
      id: Number(idUserToken),
    });

    const contactCreate = await contactRepository.create({
      email: email,
      fullName: fullName,
      telephone: telephone,
      user: user!,
    });

    const contact = await contactRepository.save(contactCreate);
    return [201, contact];
  } catch (error) {
    return [403, { message: `${error}` }];
  }
};

const listContactUserService = async (
  authToken: string
): Promise<[number, iContact[] | { message: string }]> => {
  const idUserToken = decodeTokenIdUser(authToken);
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: Number(idUserToken),
  });
  if (user) {
    const contacts = await contactRepository.find({
      where: { user: { id: user.id } },
      order: { id: "desc" },
    });
    return [200, contacts];
  }
  return [404, { message: "not found" }];
};

const deleteContactService = async (
  authToken: string,
  contactId: number
): Promise<[number, null | { message: string }]> => {
  const idUserToken = decodeTokenIdUser(authToken);
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: Number(idUserToken),
  });
  if (user) {
    const contact = await contactRepository.findOne({
      where: { user: { id: user.id }, id: contactId },
    });
    if (!contact) {
      return [404, { message: "not found" }];
    }
    await contactRepository.delete({ id: contact.id });
    return [204, null];
  }
  return [404, { message: "user not found" }];
};

const updateContactService = async (
  authToken: string,
  contactId: number,
  body: iContactUpdate
): Promise<[number, null | { message: string } | iContact]> => {
  try {
    const idUserToken = decodeTokenIdUser(authToken);
    const user = await AppDataSource.getRepository(User).findOneBy({
      id: Number(idUserToken),
    });
    if (user) {
      let contact = await contactRepository.findOne({
        where: { user: { id: user.id }, id: contactId },
      });
      if (!contact) {
        return [404, { message: "not found" }];
      }
      const updateContact = contactRepository.create(body);
      await contactRepository.update(contact.id, updateContact);
      contact = await contactRepository.findOne({
        where: { id: contactId },
      });

      return [202, contact];
    }
    return [404, { message: "user not found" }];
  } catch (err) {
    console.log(err);
    return [400, { message: "error" }];
  }
};

const getIdContactService = async (
  authToken: string,
  contactId: number
): Promise<[number, null | { message: string } | iContact]> => {
  const idUserToken = decodeTokenIdUser(authToken);
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: Number(idUserToken),
  });
  if (user) {
    let contact = await contactRepository.findOne({
      where: { user: { id: user.id }, id: contactId },
    });
    if (!contact) {
      return [404, { message: "not found" }];
    }
    return [202, contact];
  }
  return [404, { message: "user not found" }];
};

export {
  createContactService,
  listContactUserService,
  deleteContactService,
  updateContactService,
  getIdContactService,
};
