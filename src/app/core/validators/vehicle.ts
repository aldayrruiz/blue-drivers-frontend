import { maxLength, minLength, required } from './validators';

export const vehicleBrandValidators = [required];
export const vehicleModelValidators = [required];
export const vehicleNumberPlateValidators = [required, minLength(7), maxLength(8)];
export const vehicleImeiValidators = [required];
export const vehicleFuelValidators = [required];
export const vehicleTypeValidators = [required];
export const vehiclePolicyNumberValidators = [];
