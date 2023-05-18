import { CleaningPhoto, OperationMaintenanceStatus, User, Vehicle } from '@core/models';
import { CleaningType } from './type.model';

export interface Cleaning {
  id: string;
  owner: User;
  vehicle: Vehicle;
  date: string;
  type: CleaningType;
  completed: boolean;
  last_updated: string;
  date_stored: string;
  photos: CleaningPhoto[];
  status: OperationMaintenanceStatus;
}
