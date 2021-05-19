import { VehicleType } from "./vehicle-type.model";

export interface User {
  id: string;
  email: string;
  username: string;
  date_joined: string;
  allowed_types: VehicleType[];
}
