import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bloc } from 'src/app/Model/Bloc';
import { Foyer } from 'src/app/Model/Foyer';
import { Universite } from 'src/app/Model/Universite';

@Injectable({
  providedIn: 'root',
})
export class FoyerService {
  private apiServer: String = 'http://localhost:8090/TpEtudeDeCas/foyer/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private _http: HttpClient) {}

  getAllFoyers(): Observable<Foyer[]> {
    return this._http.get<Foyer[]>(
      this.apiServer + 'getAllFoyers',
      this.httpOptions
    );
  }
  deleteFoyer(id: number) {
    return this._http.delete<Foyer[]>(
      this.apiServer + 'deleteFoyer/' + id,
      this.httpOptions
    );
  }
  getAllUniversite(): Observable<Universite[]> {
    return this._http.get<Universite[]>(
      this.apiServer + 'getAllUniversite',
      this.httpOptions
    );
  }

  AjouterFoyer(foyer: Foyer) {
    return this._http.post<Foyer>(
      this.apiServer + 'addFoyer',
      foyer,
      this.httpOptions
    );
  }

  ModifierFoyer(foyer: Foyer) {
    return this._http.put<Foyer>(
      this.apiServer + 'updateFoyer',
      foyer,
      this.httpOptions
    );
  }

  getAllBlocsNull(): Observable<Bloc[]> {
    return this._http.get<Bloc[]>(
      this.apiServer + 'getAllBlocsNull',
      this.httpOptions
    );
  }

  addBlocToFoyer(idFoyer: number, blocs: Bloc[]) {
    return this._http.post(
      `${this.apiServer}AssignBlocsToFoyer/${idFoyer}`,
      blocs,
      this.httpOptions
    );
  }

  getNbEtudiantSelonFoyer() {
    return this._http.get(
      this.apiServer + 'GetNbEtudiantFoyer',
      this.httpOptions
    );
  }

  getNbChambreSelonFoyer() {
    return this._http.get(
      this.apiServer + 'GetNbChambreFoyer',
      this.httpOptions
    );
  }

  getNbChambreFoyerByType() {
    return this._http.get(
      this.apiServer + 'GetNbChambreFoyerByType',
      this.httpOptions
    );
  }

  AnnulerFoyer(universite: Universite) {
    return this._http.post(
      this.apiServer + 'AnnulerFoyer',
      universite,
      this.httpOptions
    );
  }
}
