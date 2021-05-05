import { Role } from "..";

export interface CreateUser {
  id?: string,
  email: string,
  username: string,
  password?: string,
  password2?: string,
  role: Role
}