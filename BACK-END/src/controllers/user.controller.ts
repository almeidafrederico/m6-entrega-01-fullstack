import { Request, Response } from "express";
import {
  activatedUserService,
  createUserService,
  disabledUserService,
  findUserService,
  listUserService,
  updateUserService,
} from "../services/user.service";

const userCreateController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  return res.status(201).json(user);
};

const userListController = async (req: Request, res: Response) => {
  const users = await listUserService();
  return res.status(200).json(users);
};

const userIdController = async (req: Request, res: Response) => {
  const user = await findUserService(Number(req.params.id));
  return res.status(200).json(user);
};

const userdisabledController = async (req: Request, res: Response) => {
  const user = await disabledUserService(Number(req.params.id));
  return res.status(202).json(user);
};

const userActivatedController = async (req: Request, res: Response) => {
  const user = await activatedUserService(Number(req.params.id));
  return res.status(202).json(user);
};

const userUpdateController = async (req: Request, res: Response) => {
  const user = await updateUserService(req.body, Number(req.params.id));
  return res.status(202).json(user);
};

export {
  userCreateController,
  userListController,
  userIdController,
  userdisabledController,
  userActivatedController,
  userUpdateController,
};
