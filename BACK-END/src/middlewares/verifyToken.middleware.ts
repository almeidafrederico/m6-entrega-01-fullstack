import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyTokenMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    throw new AppError("missing token", 401);
  }
  const token = authToken.split(" ")[1];
  try {
    const decodeToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
  } catch (error) {
    throw new AppError("token invalid", 401);
  }
  next();
};

export { verifyTokenMiddleware };
