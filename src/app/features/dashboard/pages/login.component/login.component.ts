import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_MODULES } from '@shared/utils/material-modules';
import { FORM_ERRORS } from "@core/form-validators/validators-form-constants";
import { CenteredLayout } from '@shared/ui/layouts/centered-layout/centered-layout';
import { Router } from '@angular/router';
import { AuthLogin } from "@services/auth.login";
import {
  requiredTrimmed,
  usernameValidator,
  passwordValidator,
} from '@core/form-validators/form-validators';


@Component({
  selector: 'app-login.component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CenteredLayout,
    MATERIAL_MODULES    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  readonly ERRORS = FORM_ERRORS;
  isLoading = signal(false);
  loginError = signal<string | null>(null);
  readonly submitted = signal(false);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthLogin);

  readonly loginForm = this.fb.group({
    username: ['', [requiredTrimmed(), usernameValidator()]],
    password: ['', [requiredTrimmed(), passwordValidator()]]
  });

  getErrorMessage(controlName: 'username' | 'password'): string | null {
    const ctrl = this.loginForm.get(controlName);
    if (!ctrl || !ctrl.errors) return null;

    const show = ctrl.touched || this.submitted();
    if (!show) return null;

    if (ctrl.hasError('required')) {
      return this.ERRORS.required;
    }

    if (controlName === 'username' && ctrl.hasError('usernameInvalid')) {
      return this.ERRORS.usuarioIncorrecto;
    }

    if (controlName === 'password' && ctrl.hasError('passwordInvalid')) {
      return this.ERRORS.passwordIncorrecta;
    }

    return null;
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.loginForm.invalid || this.isLoading()) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.loginError.set(null);
    this.loginForm.disable();

    const payload = this.loginForm.getRawValue();
    const { username, password } = this.loginForm.getRawValue();
    
    const result = this.auth.login(username ?? '', password ?? '');

    if (!result.success) {
      // Credenciales inválidas => mensaje global (no ligado a un control)
      this.loginError.set('Credenciales inválidas. Verifica usuario y contraseña.');
      this.isLoading.set(false);
      this.loginForm.enable();
      return;
    }    

    // ✅ Login OK: navegar y reemplazar historial
    this.router.navigateByUrl('/dashboard');

    // No hace falta reset() porque ya navegas, pero no molesta si lo dejas:
    this.isLoading.set(false);
    this.loginForm.enable();
    this.loginForm.reset();    
  }


}
