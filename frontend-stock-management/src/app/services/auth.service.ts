import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface RegisterData {
  email: string;
  motDePasse: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/register'; // Adaptez à votre URL

  constructor(private http: HttpClient,
    private router: Router
  ) {}

  register(userData: RegisterData): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
    logout(): Observable<any> {
    // Appel API pour déconnexion côté serveur (si nécessaire)
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  clearAuthData(): void {
    // Suppression des données d'authentification locales
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    // Autres données à nettoyer...
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}