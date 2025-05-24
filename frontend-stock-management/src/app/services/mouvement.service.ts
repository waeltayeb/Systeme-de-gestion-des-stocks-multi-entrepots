import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mouvement {
  id: number;
  produitNom: string;
  entrepotNom: string;
  type: 'ENTREE' | 'SORTIE';
  quantite: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class MouvementService {
  private apiUrl = 'http://localhost:8080/api/mouvements'; // Adaptez à votre URL

  constructor(private http: HttpClient) {}

  getMouvements(): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(this.apiUrl);
  }

  createMouvement(mouvement: Omit<Mouvement, 'id'>): Observable<Mouvement> {
    return this.http.post<Mouvement>(this.apiUrl, mouvement);
  }
}