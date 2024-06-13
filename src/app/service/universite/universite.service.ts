import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foyer } from 'src/app/Model/Foyer';
import { Universite } from 'src/app/Model/Universite';

@Injectable({
  providedIn: 'root',
})
export class UniversiteService {
  private apiServer: String = 'http://localhost:8090/TpEtudeDeCas/universite/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private _http: HttpClient) {}

  deleteUniversite(id: number) {
    return this._http.delete<Universite[]>(
      this.apiServer + 'deleteUniversite/' + id,
      this.httpOptions
    );
  }
  getAllUniversite(): Observable<Universite[]> {
    return this._http.get<Universite[]>(
      this.apiServer + 'afficherUniversites',
      this.httpOptions
    );
  }
  adduniversite(universite: Universite) {
    return this._http.post<Universite>(
      this.apiServer + 'adduniversite',
      universite,
      this.httpOptions
    );
  }

  getAllFoyer(): Observable<Foyer[]> {
    return this._http.get<Foyer[]>(
      this.apiServer + 'getFoyernull',
      this.httpOptions
    );
  }
  getAllFoyers(): Observable<Foyer[]> {
    return this._http.get<Foyer[]>(
      'http://localhost:8090/TpEtudeDeCas/foyer/getAllFoyers',
      this.httpOptions
    );
  }
  updateUniversite(universite: Universite): Observable<Universite> {
    return this._http.put<Universite>(
      this.apiServer + 'updateUniversite',
      universite,
      this.httpOptions
    );
  }

  updateFoyer(foyer: Foyer): Observable<Foyer> {
    return this._http.put<Foyer>(
      'http://localhost:8090/TpEtudeDeCas/foyer/updateFoyer',
      foyer,
      this.httpOptions
    );
  }

  getFoyerByID(idfoyer: string): Observable<Foyer> {
    return this._http.get<Foyer>(
      'http://localhost:8090/TpEtudeDeCas/foyer/' + idfoyer,
      this.httpOptions
    );
  }
}
