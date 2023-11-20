import { emailValidator } from './../../../shared/validators/validators';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { commonImports } from '@common-app';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';
// import * as customValidators from '../../../shared/validators/validators';


@Component({
  standalone: true,
  imports: [...commonImports],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, this.customValidators.firstNameAndLastnameValidator]],
    email: ['', [Validators.required, this.customValidators.emailValidator], [this.emailValidator]],
    username: ['', [Validators.required, this.customValidators.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [
      this.customValidators.isFieldOneEqualFieldTwo('password', 'password2'),
    ],
  });

  constructor(
    private fb: FormBuilder,
    private customValidators: ValidatorsService,
    private emailValidator: EmailValidatorService,
  ) {}

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset();
  }

  isValidField(field: string): boolean | null {
    return this.customValidators.isValidField(field, this.myForm);
    // return false;
  }
}
