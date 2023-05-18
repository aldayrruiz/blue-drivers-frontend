import { UserRole } from '@core/models';

export interface UserStorage {
  id: string;
  email: string;
  fullname: string;
  role: UserRole;
}
