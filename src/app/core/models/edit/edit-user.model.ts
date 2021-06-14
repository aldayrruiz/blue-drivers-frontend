import { Role } from "..";

export interface EditUser {
  id?: string,
  email: string,
  fullname: string;
  password?: string,
  role: Role
}
