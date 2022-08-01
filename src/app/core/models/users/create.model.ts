import { Role } from './role.model';

/* eslint-disable @typescript-eslint/naming-convention */
export interface CreateUser {
  id?: string;
  email: string;
  fullname: string;
  tenant: string;
  role: Role;
  ble_user_id: string;
}
