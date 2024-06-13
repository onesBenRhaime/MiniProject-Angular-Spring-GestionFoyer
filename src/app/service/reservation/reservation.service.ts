import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../../Model/Reservation';
import { Observable } from 'rxjs';
import { Etudiant } from 'src/app/Model/Etudiant';

interface ApiResponse {
  reservation: Reservation;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private url: String = 'http://localhost:8090/TpEtudeDeCas/reservation/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private _http: HttpClient) {}

  /********************************Add Reservation************************************/
  saveReservation(reservation: Reservation): Observable<Reservation> {
    return this._http.post<Reservation>(
      this.url + 'addReservation',
      reservation
    );
  }
  /********************************Add Reservation Avancee  Service************************************/
  ajouterReservation(reservation: Reservation): Observable<ApiResponse> {
    const url = `${this.url}ajouterReservation`;
    return this._http.post<ApiResponse>(url, reservation);
  }
  /********************************Get ALL  Reservations************************************/
  getAllReservations(): Observable<Reservation[]> {
    return this._http.get<Reservation[]>(
      this.url + 'getAllReservations',
      this.httpOptions
    );
  }
  /********************************Get Mes  Reservations************************************/
  getMesReservations(cinUser: number): Observable<Map<string, Object>> {
    const url = `${this.url}getMesReservations/${cinUser}`;
    return this._http.get<Map<string, Object>>(url);
  }

  /********************************Get By Id   Reservations************************************/
  getByIdReservation(id: number): Observable<Reservation> {
    return this._http.get<Reservation>(
      this.url + 'getByIdReservation/' + id,
      this.httpOptions
    );
  }
  /********************************Delete Reservation************************************/
  delete(id: number) {
    return this._http.delete<Reservation[]>(
      this.url + 'deleteReservation/' + id,
      this.httpOptions
    );
  }
  /********************************refuse Reservation************************************/
  nonValide(id: number) {
    return this._http.put<Reservation[]>(
      this.url + 'nonValide/' + id,
      this.httpOptions
    );
  }
  /********************************Accept Reservation************************************/
  ouiValide(id: number) {
    return this._http.put<Reservation[]>(
      this.url + 'ouiValide/' + id,
      this.httpOptions
    );
  }
  /********************************estValide Reservation************************************/
  estValide(id: number): Observable<Map<string, Object>> {
    return this._http.put<Map<string, Object>>(
      this.url + 'estValide/' + id,
      this.httpOptions
    );
  }

  /***********************others */
  //1.
  getByEtudiantByCin(id: number): Observable<Etudiant> {
    return this._http.get<Etudiant>(
      'http://localhost:8090/TpEtudeDeCas/etudiant/getByCinEtudiant/' + id,
      this.httpOptions
    );
  }

  //2. get infos etudinat par reservation et cin
  getInfoByReservation(id: number): Observable<Map<string, Object>> {
    return this._http.get<Map<string, Object>>(
      'http://localhost:8090/TpEtudeDeCas/etudiant/getTous/' + id,
      this.httpOptions
    );
  }
}
