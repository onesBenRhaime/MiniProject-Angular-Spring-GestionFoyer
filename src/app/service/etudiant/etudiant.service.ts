import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Etudiant } from '../../Model/Etudiant';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PEtudiant } from 'src/app/views/front/user/register/PEtudiant';

@Injectable({
  providedIn: 'root',
})
export class etudiantService {
  private apiServer: string = 'http://localhost:8090/TpEtudeDeCas/etudiant/';
  private baseURL: string = 'http://localhost:8090/TpEtudeDeCas/etudiant/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private _http: HttpClient) {}

  getAllEtudiants(): Observable<Etudiant[]> {
    return this._http.get<Etudiant[]>(
      this.apiServer + 'getAllEtudiants',
      this.httpOptions
    );
  }

  deleteEtudiants(id: number) {
    return this._http.delete<Etudiant[]>(
      this.apiServer + 'deleteEtudiant/' + id,
      this.httpOptions
    );
  }

  createEmployee(etudiant: Etudiant) {
    return this._http.post<Etudiant>(
      this.apiServer + 'addEtudiant',
      etudiant,
      this.httpOptions
    );
  }

  createEtudiant(etudiant: PEtudiant) {
    return this._http.post<PEtudiant>(
      this.apiServer + 'addEtudiant',
      etudiant,
      this.httpOptions
    );
  }

  updateEmployee(etudiant: Etudiant) {
    return this._http.put<Etudiant>(
      this.apiServer + 'updateEtudiant',
      etudiant,
      this.httpOptions
    );
  }

  getEmployeeById(idEtudiant: number): Observable<Etudiant> {
    return this._http.get<Etudiant>(`${this.baseURL}/${idEtudiant}`);
  }

  envoyerMailPass(email: String) {
    return this._http.post<String>(
      this.apiServer + 'email/send',
      email,
      this.httpOptions
    );
  }

  ModifierFoyer(etudiant: Etudiant) {
    return this._http.put<Etudiant>(
      this.apiServer + 'updateEtudiant',
      etudiant,
      this.httpOptions
    );
  }
}
