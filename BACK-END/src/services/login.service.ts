import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { ILogin } from "../interfaces/login";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginService = async (
  data: ILogin
): Promise<[number, { message?: string; token?: string }]> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    select: {
      password: true,
      id: true,
      email: true,
    },
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return [403, { message: "User or password invalid" }];
  }

  const passwordMatch = await compare(data.password, user.password);

  if (!passwordMatch) {
    return [403, { message: "User or password invalid" }];
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    `${process.env.SECRET_KEY}`,
    {
      subject: String(user.id),
      expiresIn: "24h",
    }
  );
  return [200, { token: token }];
};

export { loginService };
