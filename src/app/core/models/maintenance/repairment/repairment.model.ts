import { RepairmentPhoto, User, Vehicle } from '../..';

export interface Repairment {
  id?: string;
  owner: User;
  vehicle: Vehicle;
  date: string;
  location: string;
  description: string;
  kilometers: number;
  date_stored: string;
  photos: RepairmentPhoto[];
}
