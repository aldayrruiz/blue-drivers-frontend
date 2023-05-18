import { WheelsLocation, WheelsOperation } from '@core/models';

export interface CreateWheels {
  id?: string;
  vehicle: string;
  date: string;
  location: WheelsLocation;
  kilometers: number;
  operation: WheelsOperation;
  passed: boolean;
  completed?: boolean;
}
