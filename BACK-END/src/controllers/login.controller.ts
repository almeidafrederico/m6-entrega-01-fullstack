import { Request, Response } from "express";
import { loginService } from "../services/login.service";

const loginController = async (req: Request, res: Response) => {
  const [status, message] = await loginService(req.body);
  return res.status(status).json(message);
};

export { loginController };
