import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';
import { FORM_PATTERNS } from './validators-form-constants';


export function requiredTrimmed(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value == null) return { required: true };

    return String(value).trim().length > 0
      ? null
      : { required: true };
  };
}

export function onlyLettersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null; // required se valida aparte

    return FORM_PATTERNS.ONLY_LETTERS.test(String(value).trim())
      ? null
      : { onlyLetters: true };
  };
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    return FORM_PATTERNS.EMAIL.test(String(value).trim())
      ? null
      : { email: true };
  };
}

export function requiredDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return { required: true };

    const date = new Date(value);
    return isNaN(date.getTime())
      ? { invalidDate: true }
      : null;
  };
}


function isAtLeastAge(birthDate: Date, minAge: number): boolean {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || 
     (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= minAge;
}

