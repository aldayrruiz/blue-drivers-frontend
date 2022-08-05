/* eslint-disable @typescript-eslint/naming-convention */

import { Role } from '../users/role.model';

export interface UserStorage {
  id: string;
  email: string;
  fullname: string;
  role: Role;
}
