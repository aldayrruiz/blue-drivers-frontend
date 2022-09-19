import { Role } from './role.model';


export interface CreateUser {
  id?: string;
  email: string;
  fullname: string;
  tenant: string;
  role: Role;
  ble_user_id?: string;
  is_interventor?: boolean;
  is_supervisor?: boolean;
}
