export interface iContact {
  email: string;
  fullName: string;
  telephone: string;
}

export interface iContactResponse {
  id: number;
  email: string;
  fullName: string;
  telephone: string;
  createdAt: Date;
}

export interface iContactUpdate {
  email?: string;
  fullName?: string;
  telephone?: string;
}
