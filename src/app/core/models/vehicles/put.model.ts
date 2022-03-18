import { VehicleFuel } from './fuel.model';

export interface EditVehicle {
  model: string;
  brand: string;
  number_plate: string;
  gps_device: string;
  is_disabled: boolean;
  fuel: VehicleFuel;
}
