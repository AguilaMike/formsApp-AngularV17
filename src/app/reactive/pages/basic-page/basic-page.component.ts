import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { commonImports } from '@common-app';

const rtx5090 = {
  name: 'RTX 5090',
  price: 1000,
  inStorage: 10,
};

@Component({
  standalone: true,
  imports: [...commonImports],
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.scss'
})
export class BasicPageComponent implements OnInit {
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm.reset(rtx5090);
  }

  isValidField(field: string): boolean | null {
    const fieldControl = this.myForm.controls[field];
    return fieldControl.errors && fieldControl.touched;
  }

  getErrorMessage(field: string): string | null {
    const fieldControl = this.myForm.controls[field];
    if (!fieldControl) {
      return null;
    }

    const errors = fieldControl.errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `This field must be longer than ${errors['minlength'].requiredLength} characters`;
          case 'maxlength':
          return `This field must be lower than ${errors['maxlength'].requiredLength} characters`;
        case 'min':
          return `This field must be greater than ${errors['min'].min}`;
        case 'max':
            return `This field must be greater than ${errors['max'].min}`;
        default:
          return null;
      }
    }

    return null;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
