export interface iUserRequest {
  email: string;
  username: string;
  password: string;
  fullName: string;
  telephone: string;
}

export interface iUserResponse {
  email: string;
  username: string;
  fullName: string;
  telephone: string;
  isActive: boolean;
  createdAt: Date;
}

export interface iUserDisabled {
  message: string;
}

export interface iUserUpdate {
  email?: string;
  username?: string;
  password?: string;
  fullName?: string;
  telephone?: string;
  isActive?: boolean;
}
