import { User, Vehicle } from '@core/models';

export interface Odometer {
  id: string;
  owner: User;
  vehicle: Vehicle;
  date: string;
  kilometers: number;
  completed: boolean;
  last_updated: string;
  date_stored: string;
}
