import { Request, Response } from "express";
import {
  createContactService,
  deleteContactService,
  listContactUserService,
  updateContactService,
} from "../services/contact.service";

const contactCreateController = async (req: Request, res: Response) => {
  const body = req.body;
  const authToken = req.headers.authorization;
  const [status, contact] = await createContactService(body, authToken!);
  return res.status(status).json(contact);
};

const contactListController = async (req: Request, res: Response) => {
  const authToken = req.headers.authorization;
  const [status, contact] = await listContactUserService(authToken!);
  return res.status(status).json(contact);
};

const contactDeleteController = async (req: Request, res: Response) => {
  const idContact = Number(req.params.id);
  const authToken = req.headers.authorization;
  const [status, message] = await deleteContactService(authToken!, idContact);
  return res.status(status).json(message);
};

const contactUpdateController = async (req: Request, res: Response) => {
  const idContact = Number(req.params.id);
  const authToken = req.headers.authorization;
  const body = req.body;
  const [status, message] = await updateContactService(
    authToken!,
    idContact,
    body
  );
  return res.status(status).json(message);
};

export {
  contactCreateController,
  contactListController,
  contactDeleteController,
  contactUpdateController,
};
