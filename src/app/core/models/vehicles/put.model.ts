
import { VehicleFuel, VehicleType } from '..';

export interface EditVehicle {
  model: string;
  brand: string;
  number_plate: string;
  gps_device: string;
  is_disabled: boolean;
  fuel: VehicleFuel;
  type: VehicleType;
  insurance_company: string;
  policy_number: string;
  icon: number;
}
