import { Role } from "..";

export interface EditUser {
  id?: string,
  email: string,
  username: string,
  password?: string,
  role: Role
}
