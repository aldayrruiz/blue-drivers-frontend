import { UserRole } from './role.model';


export interface CreateUser {
  id?: string;
  email: string;
  fullname: string;
  tenant: string;
  role: UserRole;
  ble_user_id?: string;
  is_interventor?: boolean;
  is_supervisor?: boolean;
}
