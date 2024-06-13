import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EtudiantModule } from './views/admin/etudiant/etudiant.module';

import { UniversiteModule } from './views/admin/universite/universite.module';
import { ChambreModule } from './views/admin/chambre/chambre.module';
import { BlocModule } from './views/admin/bloc/bloc.module';
import { UserModule } from './views/front/user/user.module';
import { FoyerModule } from './views/admin/foyer/foyer.module';
import { DashboardModule } from './views/admin/dashboard/dashboard.module';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ToastrModule } from 'ngx-toastr';

import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table"
import {MatPaginatorModule} from "@angular/material/paginator"
import {MatSortModule} from "@angular/material/sort"
import {MatDialogModule} from "@angular/material/dialog"
import {MatSelectModule} from "@angular/material/select"
import {MatCheckboxModule} from "@angular/material/checkbox"
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationModule } from './views/admin/reservation/reservation.module';






@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReservationModule,
    FoyerModule,
    UniversiteModule,
    ChambreModule,
    BlocModule,
    UserModule,
    DashboardModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    
    MatCardModule,
MatButtonModule,
MatTableModule,
MatPaginatorModule,
MatSortModule,
MatDialogModule,
MatSelectModule,
MatCheckboxModule,
ReactiveFormsModule,
ToastrModule.forRoot()

  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
