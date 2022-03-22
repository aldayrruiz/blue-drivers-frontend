import { exactLength, required } from './validators';

export const nameValidators = [required];
export const phoneValidators = [required, ...exactLength(9)];
