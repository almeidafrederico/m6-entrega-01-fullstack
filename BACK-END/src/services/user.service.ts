import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import {
  iUserDisabled,
  iUserRequest,
  iUserResponse,
  iUserUpdate,
} from "../interfaces/users";

const userRepository = AppDataSource.getRepository(User);
const createUserService = async (
  data: iUserRequest
): Promise<iUserResponse> => {
  let user = userRepository.create(data);

  try {
    await userRepository.save(user);
  } catch (error: any) {
    console.log(error.detail);
  }
  return user;
};

const listUserService = async (): Promise<iUserResponse[]> => {
  return await userRepository.find({});
};

const findUserService = async (id: number): Promise<iUserResponse> => {
  const user = await userRepository.findOne({ where: { id: id } });
  return user!;
};

const disabledUserService = async (id: number): Promise<iUserDisabled> => {
  try {
    const user = await userRepository.findOne({ where: { id: id } });
    if (user == null) {
      throw new Error("Usuario não existe");
    }
    await userRepository.update(id, { isActive: false });
  } catch (error: any) {
    return { message: `${error}` };
  }
  return { message: "Usuario desativado" };
};

const activatedUserService = async (id: number): Promise<iUserDisabled> => {
  try {
    const user = await userRepository.findOne({ where: { id: id } });
    if (user == null) {
      throw new Error("Usuario não existe");
    }
    await userRepository.update(id, { isActive: true });
  } catch (error: any) {
    return { message: `${error}` };
  }
  return { message: "Usuario ativado" };
};

const updateUserService = async (
  data: iUserUpdate,
  id: number
): Promise<iUserResponse> => {
  let updateData = userRepository.create(data);
  try {
    let user = await userRepository.findOne({ where: { id: id } });
    if (user == null) {
      throw new Error("Usuario não existe");
    }
    await userRepository.update(id, updateData);
  } catch (error: any) {}
  let user = await userRepository.findOne({ where: { id: id } });
  return user!;
};

export {
  createUserService,
  listUserService,
  findUserService,
  disabledUserService,
  activatedUserService,
  updateUserService,
};
