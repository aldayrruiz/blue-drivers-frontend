import { exactLength, required } from './validators';

const BRAND_LENGTH = 7;

export const brandValidators = [required];
export const modelValidators = [required];
export const numberPlateValidators = [required, ...exactLength(BRAND_LENGTH)];
export const imeiValidators = [required];
export const fuelValidators = [required];
export const policyNumberValidators = [];
