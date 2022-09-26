import { UserRole } from './role.model';

export interface EditPatchUser {
  role?: UserRole;
  is_disabled?: boolean;
  ble_user_id?: string;
  is_supervisor?: boolean;
  is_interventor?: boolean;
}
