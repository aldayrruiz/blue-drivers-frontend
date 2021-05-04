import { Role } from "..";

export interface CreateUser {
  id?: string,
  email: string,
  username: string,
  role: Role
}