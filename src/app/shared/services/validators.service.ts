import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  private _firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  private _emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  private _usernamePattern: string = '([a-zA-Z0-9]+)';

  private _patternValidator(pattern: string, errorName: string) {
    return (control: FormControl): ValidationErrors | null => {
      return control.value?.trim().match(pattern)
        ? null
        : {
          [errorName]: {
            requiredPattern: pattern,
            actualValue: control.value,
          },
        };
    };
  }

  public isValidField(field: string, form: FormGroup): boolean | null {
    const fieldControl = form.controls[field];
    return fieldControl.errors && fieldControl.touched;
  }

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value = control.value?.trim().toLowerCase();
    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }
    return null;
  }

  public firstNameAndLastnameValidator = (control: FormControl): ValidationErrors | null => {
    return this._patternValidator(this._firstNameAndLastnamePattern, 'firstNameAndLastname')(control);
  }

  public emailValidator = (control: FormControl): ValidationErrors | null => {
    return this._patternValidator(this._emailPattern, 'email')(control);
  }

  public usernameValidator = (control: FormControl): ValidationErrors | null => {
    return this._patternValidator(this._usernamePattern, 'username')(control);
  }

  public isFieldOneEqualFieldTwo(fieldOne: string, fieldTwo: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(fieldOne);
      const fieldValue2 = formGroup.get(fieldTwo);
      if (fieldValue1?.value === fieldValue2?.value) {
        fieldValue2?.setErrors(null);
        return null;
      }
      fieldValue2?.setErrors({ notEqual: true });
      return { notEqual: true };
    };
  };
}
