import { Role } from "..";

export interface CreateUser {
  id?: string,
  email: string,
  username: string,
  password?: string,
  role: Role
}