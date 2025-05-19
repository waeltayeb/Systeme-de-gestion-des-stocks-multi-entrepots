// entrepot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepotService {
  private apiUrl = 'http://localhost:8080/api/entrepots';

  constructor(private http: HttpClient) {}

  getEntrepots(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createEntrepot(entrepot: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, entrepot);
  }

  updateEntrepot(id: number, entrepot: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, entrepot);
  }

  deleteEntrepot(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}