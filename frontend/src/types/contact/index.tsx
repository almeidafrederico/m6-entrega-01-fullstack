export interface iContact {
  id: number;
  email: string;
  fullName: string;
  telephone: string;
  createdAt: Date;
}

export interface iContactRegister {
  email: string;
  fullName: string;
  telephone: string;
}

export interface iContactUpdate {
  email?: string;
  fullName?: string;
  telephone?: string;
}
