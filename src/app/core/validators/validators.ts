import { Validators } from '@angular/forms';

export const required = Validators.required;
export const maxLength = (length: number) => Validators.maxLength(length);
export const minLength = (length: number) => Validators.minLength(length);
export const exactLength = (length: number) => [
  minLength(length),
  maxLength(length),
];
export const isEmail = Validators.email;
