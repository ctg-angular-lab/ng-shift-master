import { Component, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';
import { FORM_ERRORS } from "@core/form-validators/validators-form-constants";
import {
  requiredTrimmed,
  onlyLettersValidator,
  emailValidator,
  requiredDateValidator,
} from '@core/form-validators/form-validators';


@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.scss',
})

export class BookingForm {
  readonly ERRORS = FORM_ERRORS;
  private readonly fb = new FormBuilder();

  readonly form = this.fb.group({
    firstName: ['', [requiredTrimmed(), onlyLettersValidator()]],
    lastName: ['', [requiredTrimmed(), onlyLettersValidator()]],
    email: ['', [requiredTrimmed(), emailValidator()]],
    birthDate: ['', [requiredDateValidator()]],
    isBankClient: [false],
    isPriority: [false],
  });

  private readonly birthDateSig = toSignal(
    this.form.get('birthDate')!.valueChanges.pipe(
      startWith(this.form.get('birthDate')!.value)
    ),
    { initialValue: this.form.get('birthDate')!.value }
  );

  readonly isMinor = computed(() => {
    const value = this.birthDateSig();
    if (!value) return false;

    const birthDate = new Date(value);
    if (Number.isNaN(birthDate.getTime())) return false;

    return !this.isAtLeastAge(birthDate, 18);
  });


  private isAtLeastAge(birthDate: Date, minAge: number): boolean {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= minAge;
  }
  
  
  hasError(controlName: keyof BookingForm['form']['controls'], errorKey: string): boolean {
    const ctrl = this.form.get(controlName as string);
    return !!ctrl && ctrl.touched && ctrl.hasError(errorKey);
  }
  
  getErrorMessage(controlName: keyof BookingForm['form']['controls']): string | null {
    const ctrl = this.form.get(controlName as string);
    if (!ctrl || !ctrl.touched || !ctrl.errors) return null;

    if (controlName === 'firstName' && (ctrl.hasError('required') || ctrl.hasError('onlyLetters'))) {
      return this.ERRORS.firstName;
    }

    if (controlName === 'lastName' && (ctrl.hasError('required') || ctrl.hasError('onlyLetters'))) {
      return this.ERRORS.lastName;
    }

    if (controlName === 'email' && (ctrl.hasError('required') || ctrl.hasError('email'))) {
      return this.ERRORS.email;
    }

    if (controlName === 'birthDate' && (ctrl.hasError('required') || ctrl.hasError('invalidDate'))) {
      // No lo tenías en FORM_ERRORS; si quieres lo agregamos ahí. Por ahora texto simple:
      return 'Debes indicar una fecha válida';
    }

    return null;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    // payload limpio
    const payload = this.form.getRawValue();
    console.log('SUBMIT payload:', payload);

    // Aquí llamarías tu service...
  }

}
