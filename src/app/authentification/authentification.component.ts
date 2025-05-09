import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthResponse, User } from '../models/user.model';

function nonEmptyValidator(control: AbstractControl): ValidationErrors | null {
  return (control.value || '').trim().length === 0 ? { nonEmpty: true } : null;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthComponent {
  authForm: FormGroup;
  isLoginMode = false; // Démarre en mode inscription pour tester
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.authForm = this.fb.group({
      name: ['', [Validators.required, nonEmptyValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['CLIENT', [Validators.required]]
    });
  }

  switchMode(event: Event) {
    event.preventDefault();
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
    if (this.isLoginMode) {
      this.authForm.get('name')?.clearValidators();
      this.authForm.get('role')?.clearValidators();
    } else {
      this.authForm.get('name')?.setValidators([Validators.required, nonEmptyValidator]);
      this.authForm.get('role')?.setValidators([Validators.required]);
    }
    this.authForm.get('name')?.updateValueAndValidity();
    this.authForm.get('role')?.updateValueAndValidity();
    console.log('Mode basculé:', this.isLoginMode ? 'Connexion' : 'Inscription');
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.authForm.invalid) {
      this.error = 'Veuillez remplir tous les champs requis';
      console.log('Formulaire invalide:', this.authForm.value);
      return;
    }

    this.loading = true;
    this.error = null;
    const { name, email, password, role } = this.authForm.value;
    console.log('Données envoyées:', { name, email, password, role });

    if (this.isLoginMode) {
      this.authService.login({ email, password }).subscribe({
        next: (res: AuthResponse) => {
          console.log('Connexion réussie:', res);
          this.loading = false;
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/hotels']);
          } else {
            this.error = 'Connexion réussie, mais aucun token reçu';
          }
        },
        error: (err) => {
          this.error = err.error?.error || 'Échec de la connexion';
          this.loading = false;
          console.log('Erreur connexion:', err);
        }
      });
    } else {
      const newUser: User = { name, email, password, role };
      this.authService.register(newUser).subscribe({
        next: (res: AuthResponse) => {
          console.log('Inscription réussie:', res);
          this.loading = false;
          this.authForm.reset({ role: 'CLIENT' });
          this.error = null;
          // Ne bascule pas automatiquement pour montrer le succès
        },
        error: (err) => {
          this.error = err.error?.error || 'Échec de l\'inscription';
          this.loading = false;
          console.log('Erreur inscription:', err);
        }
      });
    }
  }
}