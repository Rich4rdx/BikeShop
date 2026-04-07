import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  activeTab = 0;
  loginForm: FormGroup;
  registroForm: FormGroup;
  hidePassword = true;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmar: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/ventas']);
      },
      error: (err) => {
        this.loading = false;
        const msg = err.status === 401
          ? 'Credenciales incorrectas'
          : 'Error al iniciar sesión';
        this.snack.open(msg, 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snack']
        });
      }
    });
  }

  onRegistro(): void {
  if (this.registroForm.invalid) return;
  const { username, password, confirmar, nombre } = this.registroForm.value;
  if (password !== confirmar) {
    this.snack.open('Las contraseñas no coinciden', 'Cerrar', {
      duration: 3000, panelClass: ['error-snack']
    });
    return;
  }
  this.loading = true;
  this.authService.registro({ username, password, nombre }).subscribe({
    next: () => {
      this.loading = false;
      this.registroForm.reset();
      this.activeTab = 0;
      this.snack.open('Empleado registrado. Ahora inicia sesión.', 'Cerrar', {
        duration: 4000
      });
    },
    error: (err) => {
      this.loading = false;
      let msg = 'Error al registrar usuario';
      try {
        const body = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
        msg = body?.error || msg;
      } catch {}
      this.snack.open(msg, 'Cerrar', {
        duration: 3000, panelClass: ['error-snack']
      });
    }
  });
}}
