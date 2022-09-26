

import { UserRole } from '../users/role.model';

export interface UserStorage {
  id: string;
  email: string;
  fullname: string;
  role: UserRole;
}
