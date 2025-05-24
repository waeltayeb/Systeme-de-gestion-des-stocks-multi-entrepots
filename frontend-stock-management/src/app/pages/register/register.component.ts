import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('motDePasse')?.value === form.get('confirmPassword')?.value 
      ? null 
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    const { email, motDePasse } = this.registerForm.value;

    this.authService.register({ email, motDePasse }).subscribe({
      next: () => {
        Swal.fire({
          title: 'Inscription réussie!',
          text: 'Votre compte a été créé avec succès',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        console.error('Erreur inscription:', err);
        let errorMessage = "Une erreur s'est produite lors de l'inscription";
        
        if (err.status === 409) {
          errorMessage = "Cet email est déjà utilisé";
        }

        Swal.fire('Erreur', errorMessage, 'error');
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  get email() { return this.registerForm.get('email'); }
  get motDePasse() { return this.registerForm.get('motDePasse'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
}