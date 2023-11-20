import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value?.trim();
    const httpCallObservable = new Observable<ValidationErrors | null>((subscriber) => {
      if (email === 'test@test.com') {
        subscriber.next({ emailTaken: true});
      } else {
        subscriber.next(null);
      }
      subscriber.complete();
    }).pipe(delay(2000));
    return httpCallObservable;
  }

}
