import { Fleet, Reservation, VehicleType } from ".";

/**
 * This interface is used to charge the vehicle details page.
 * Reservation fields is important to display them, obviously.
 */
export interface VehicleDetails {
  id: string;
  name: string;
  date_stored: string;
  type: VehicleType;
  fleet: Fleet;
  reservations: Reservation[];
}
