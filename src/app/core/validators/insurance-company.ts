import { exactLength, required } from './validators';

export const insuranceCompanyNameValidators = [required];
export const insuranceCompanyPhoneValidators = [required, ...exactLength(9)];
