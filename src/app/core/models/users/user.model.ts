import { Vehicle } from '..';
import { Role } from './role.model';

export interface User {
  id: string;
  email: string;
  fullname: string;
  date_joined: string;
  allowed_vehicles: Vehicle[];
  is_disabled: boolean;
  role: Role;
}
