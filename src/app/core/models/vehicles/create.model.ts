import { VehicleFuel, VehicleType } from '..';

/* eslint-disable @typescript-eslint/naming-convention */
export interface CreateVehicle {
  model: string;
  brand: string;
  number_plate: string;
  gps_device: string;
  fuel: VehicleFuel;
  type: VehicleType;
  insurance_company: string;
  policy_number: string;
  icon: number;
}
