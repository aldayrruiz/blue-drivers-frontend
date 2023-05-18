import { User, Vehicle, WheelsLocation, WheelsOperation, WheelsPhoto } from '@core/models';

export interface Wheels {
  id: string;
  owner: User;
  vehicle: Vehicle;
  date: string;
  location: WheelsLocation;
  kilometers: number;
  operation: WheelsOperation;
  passed: boolean;
  completed: boolean;
  last_updated: string;
  date_stored: string;
  photos: WheelsPhoto[];
}
