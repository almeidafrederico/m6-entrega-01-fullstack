import jwt from "jsonwebtoken";
import "dotenv/config";

const decodeTokenIdUser = (authToken: string): string => {
  const token = authToken.split(" ")[1];
  const decodeToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
  // @ts-ignore
  return decodeToken.id;
};

export { decodeTokenIdUser };
