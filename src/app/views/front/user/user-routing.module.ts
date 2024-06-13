import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { ProfilComponent } from '../profil/profil/profil.component';
import { NouveauPassComponent } from './nouveau-pass/nouveau-pass.component';
import { ReservationsComponent } from './Reservation/reservations/reservations.component';
import { AjouterReservationComponent } from './Reservation/ajouter-reservation/ajouter-reservation.component';

const routes: Routes = [ 
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },       
      { path: 'reservations', component: ReservationsComponent },
      { path: 'ajouterReservation', component: AjouterReservationComponent },
      { path: 'NouveauPass', component: NouveauPassComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }