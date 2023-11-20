import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { commonImports } from '@common-app';

@Component({
  standalone: true,
  imports: [commonImports],
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.scss'
})
export class SwitchesPageComponent implements OnInit {
  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    const { termsAndConditions, ...rest } = this.myForm.value;
    this.person = rest;
    this.myForm.reset();
  }

  isValidField(field: string): boolean | null {
    const fieldControl = this.myForm.controls[field];
    return fieldControl.errors && fieldControl.touched;
  }
}
