import { User } from '../../users/user.model';
import { Vehicle } from '../../vehicles/vehicle.model';
import { OperationMaintenanceStatus } from '../status.model';
import { CleaningPhoto } from './photo.model';
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
