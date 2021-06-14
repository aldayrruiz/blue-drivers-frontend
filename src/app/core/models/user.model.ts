import { Vehicle } from "./vehicle.model";

export interface User {
  id: string;
  email: string;
  fullname: string;
  date_joined: string;
  allowed_vehicles: Vehicle[];
}
