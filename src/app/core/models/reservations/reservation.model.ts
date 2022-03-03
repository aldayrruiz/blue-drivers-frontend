import { User, Vehicle } from '..';

export interface Reservation {
  id?: string;
  title: string;
  date_stored?: string;
  start: string;
  end: string;
  description: string;
  owner?: User;
  vehicle: Vehicle;
}
