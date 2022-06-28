import { maxLength, minLength, required } from './validators';

export const brandValidators = [required];
export const modelValidators = [required];
export const numberPlateValidators = [required, minLength(7), maxLength(8)];
export const imeiValidators = [required];
export const fuelValidators = [required];
export const policyNumberValidators = [];
