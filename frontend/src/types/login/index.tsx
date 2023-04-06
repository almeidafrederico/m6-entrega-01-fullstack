import { ReactNode } from "react";

export interface ILogin {
  email: string;
  password: string;
}

export interface IProviderProps {
  children: ReactNode;
}
