import { Device } from "./device.model";

/**
 * This interface is used to charge a list of vehicles.
 * As you can see it does not have reservations field.
 */
export interface Vehicle {
  id: string;
  name: string;
  date_stored: string;
  brand: string;
  model: string;
  number_plate: string;
  gps_device: Device;
  is_disabled: boolean;
}
