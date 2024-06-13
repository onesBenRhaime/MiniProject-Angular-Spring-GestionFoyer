import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bloc } from 'src/app/Model/Bloc';
import { Router } from '@angular/router';
import { Foyer } from 'src/app/Model/Foyer';
import { Chambre } from 'src/app/Model/Chambre';

@Injectable({
  providedIn: 'root',
})
export class BlocService {
  private baseUrl = 'http://localhost:8090/TpEtudeDeCas/bloc';

  constructor(private http: HttpClient, private router: Router) {}

  getBlocs(): Observable<Bloc[]> {
    console.log(this.baseUrl + '/');
    this.http
      .get(this.baseUrl + '/getAllBlocs')
      .subscribe((value) =>
        console.log('Observable.subscribe returned : ', value)
      );
    return this.http.get<Bloc[]>(this.baseUrl + '/getAllBlocs');
  }

  refreshPage() {
    console.log(this.router.url);
    this.router.navigate(['/admin']).then(() => {
      this.router.navigate(['/admin/bloc']);
      console.log(this.router.url);
    });
  }

  deleteBloc(idBloc: string): void {
    this.http
      .delete(this.baseUrl + '/deleteBloc/' + idBloc)
      .subscribe((value) => {
        console.log('item deleted');
        this.refreshPage();
      });
    console.log(this.baseUrl + '/deleteBloc/' + idBloc);
  }

  updateBloc(bloc: Bloc): Observable<Bloc> {
    return this.http.put<Bloc>(`${this.baseUrl}/updateBloc`, bloc);
  }

  addBloc(bloc: Bloc): Observable<Bloc> {
    return this.http.post(this.baseUrl + '/addBloc', bloc);
  }

  getFoyers(): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(
      'http://localhost:8090/TpEtudeDeCas/foyer/getAllFoyers'
    );
  }

  getFoyerById(id: number | undefined): Observable<Foyer> {
    return this.http.get<Foyer>(
      'http://localhost:8090/TpEtudeDeCas/foyer/' + id
    );
  }

  getAllUnassignedChambres(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(
      'http://localhost:8090/TpEtudeDeCas/chambre/unassigned'
    );
  }
}
