import { VehicleFuel, VehicleType } from '..';

export interface CreateVehicle {
  model: string;
  brand: string;
  number_plate: string;
  gps_device: string;
  fuel: VehicleFuel;
  type: VehicleType;
  insurance_company: string;
  policy_number: string;
  icon: string;
}
