import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_MODULES } from '@shared/utils/material-modules';
import { CenteredLayout } from '@shared/ui/layouts/centered-layout/centered-layout';
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
  imports: [
    ReactiveFormsModule,
    CenteredLayout,
    MATERIAL_MODULES
  ],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.scss',
})

export class BookingForm {
  readonly ERRORS = FORM_ERRORS;
  private readonly fb = inject(FormBuilder); 
  isLoading = signal(false);

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
    if (this.form.invalid || this.isLoading()) return;

    this.isLoading.set(true); // Bloqueamos el formulario
    this.form.disable();      // Deshabilitamos inputs visualmente

    const payload = this.form.getRawValue();

    // Simulamos una llamada al servicio (o usa tu QueueService)
    setTimeout(() => {
      console.log('Turno generado con éxito', payload);

      this.isLoading.set(false);
      this.form.enable();
      this.form.reset();
    }, 2000);
  }

}
