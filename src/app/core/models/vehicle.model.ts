/**
 * This interface is used to charge a list of vehicles.
 * As you can see it does not have reservations field.
 */
export interface Vehicle {
  id: string;
  name: string;
  date_stored: string;
}
