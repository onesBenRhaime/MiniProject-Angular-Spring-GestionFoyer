// Chambres.service.ts

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Chambres } from 'src/app/Model/Chambres';
import { Bloc } from 'src/app/Model/Bloc';

@Injectable({
  providedIn: 'root',
})
export class ChambreService {
  private apiServer: string = 'http://localhost:8090/TpEtudeDeCas/chambre/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private nombreChambressSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  nombreChambress$: Observable<number> =
    this.nombreChambressSubject.asObservable();

  constructor(private _http: HttpClient) {
    const storedCount = localStorage.getItem('nombreChambres');
    const initialCount = storedCount ? parseInt(storedCount, 10) : 0;
    this.nombreChambressSubject = new BehaviorSubject<number>(initialCount);
  }

  getAllChambress(): Observable<Chambres[]> {
    return this._http.get<Chambres[]>(
      this.apiServer + 'getAllChambres',
      this.httpOptions
    );
  }

  getAllBlocs(): Observable<Bloc[]> {
    return this._http.get<Bloc[]>(
      'http://localhost:8090/TpEtudeDeCas/bloc/getAllBlocs',
      this.httpOptions
    );
  }

  deleteChambres(idChambres: number): Observable<any> {
    return this._http.delete(
      `${this.apiServer}deleteChambre/${idChambres}`,
      this.httpOptions
    );
  }

  updateChambres(Chambres: Chambres): Observable<Chambres> {
    return this._http.put<Chambres>(
      `${this.apiServer}updateChambre`,
      Chambres,
      this.httpOptions
    );
  }

  createChambres(Chambres: Chambres) {
    return this._http.post<Chambres>(
      this.apiServer + 'addChambre',
      Chambres,
      this.httpOptions
    );
  }
  getcountChambres() {
    return this._http.get(this.apiServer + 'getnbChambre', this.httpOptions);
  }
  getBlocByIdChambre<Bloc>(id: number) {
    return this._http.get<Bloc>(
      'http://localhost:8090/TpEtudeDeCas/bloc/' + id
    );
  }
  getStatistiquesChambres(): Observable<any> {
    return this._http.get<any>(this.apiServer + 'stat', this.httpOptions);
  }
}
