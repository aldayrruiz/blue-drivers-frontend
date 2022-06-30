import { isEmail, maxLength, minLength, required } from './validators';

const MIN_PASS_LENGTH = 6;

export const emailValidators = [required, isEmail];
export const fullnameValidators = [required];
export const passwordValidators = [required, minLength(MIN_PASS_LENGTH)];
export const bleUserValidators = [minLength(12), maxLength(12)];
