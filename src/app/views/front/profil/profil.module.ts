import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';

import { FormsModule } from '@angular/forms';
import { ProfilComponent } from './profil/profil.component';


@NgModule({
  declarations: [
ProfilComponent
    ],
  imports: [
    ProfilRoutingModule,FormsModule,
    CommonModule

  ]

})
export class ProfilModule { }