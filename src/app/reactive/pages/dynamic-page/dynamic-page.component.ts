import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { commonImports } from '@common-app';

@Component({
  standalone: true,
  imports: [...commonImports],
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.scss'
})
export class DynamicPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Final Fantasy', Validators.required],
      ['The Legend of Zelda', Validators.required],
    ]),
  });

  public newFavorite: FormControl = this.fb.control('', Validators.required);

  constructor(
    private fb: FormBuilder,
  ) {}

  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddFavorite(): void {
    if (this.newFavorite.invalid) {
      return;
    }
    const newFavorite = this.newFavorite.value;
    this.favoriteGames.push(this.fb.control(newFavorite, Validators.required));
    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

  isValidField(field: string): boolean | null {
    const fieldControl = this.myForm.controls[field];
    return fieldControl.errors && fieldControl.touched;
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    const fieldControl = formArray.controls[index];
    return fieldControl.errors && fieldControl.touched;
  }

  getErrorMessage(field: string): string | null {
    const fieldControl = this.myForm.controls[field];
    if (!fieldControl) {
      return null;
    }

    return this.getErrorString(fieldControl);
  }

  getErrorMessageArray(formArray: FormArray, index: number): string | null {
    const fieldControl = formArray.controls[index];
    if (!fieldControl) {
      return null;
    }

    return this.getErrorString(fieldControl);
  }

  private getErrorString(fieldControl: AbstractControl<any, any>): string | null {
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
}
