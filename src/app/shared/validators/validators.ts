import { FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";

const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
const usernamePattern: string = '([a-zA-Z0-9]+)';

function patternValidator(pattern: string, errorName: string) {
  return (control: FormControl): ValidationErrors | null => {
    return control.value?.trim().match(pattern)
      ? null
      : {
        [errorName]: {
          requiredPattern: pattern,
          actualValue: control.value,
        },
      };
  }
}

export const cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value = control.value?.trim().toLowerCase();
    if (value === 'strider') {
        return {
            noStrider: true,
        };
    }
    return null;
};

export const firstNameAndLastnameValidator = (control: FormControl): ValidationErrors | null => {
  return patternValidator(firstNameAndLastnamePattern, 'firstNameAndLastnameAPP')(control);
};

export const emailValidator = (control: FormControl): ValidationErrors | null => {
  return patternValidator(emailPattern, 'emailAPP')(control);
};

export const usernameValidator = (control: FormControl): ValidationErrors | null => {
  return patternValidator(usernamePattern, 'usernameAPP')(control);
};

export function isValidField(field: string, form: FormGroup): boolean | null {
  const fieldControl = form.controls[field];
  return fieldControl.errors && fieldControl.touched;
}
