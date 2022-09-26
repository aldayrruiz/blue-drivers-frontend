import { isEmail, maxLength, minLength, required } from './validators';

const MIN_PASS_LENGTH = 6;

export const userEmailValidators = [required, isEmail];
export const userFullnameValidators = [required];
export const userRoleValidators = [required];
export const userPasswordValidators = [required, minLength(MIN_PASS_LENGTH)];
export const userBleValidators = [minLength(12), maxLength(12)];
