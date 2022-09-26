
import { Vehicle } from '..';
import { UserRole } from './role.model';

export interface User {
  id: string;
  email: string;
  fullname: string;
  date_joined: string;
  allowed_vehicles: Vehicle[];
  is_disabled: boolean;
  role: UserRole;
  ble_user_id: string;
  is_supervisor: boolean;
  is_interventor: boolean;
}
