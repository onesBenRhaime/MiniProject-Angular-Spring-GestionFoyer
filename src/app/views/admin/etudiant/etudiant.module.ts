import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { EtudiantComponent } from './etudiants/etudiants.component';
import { AjouterEtudiantComponent } from './ajouter-etudiant/ajouter-etudiant.component';
import { FormsModule } from '@angular/forms';
import { UpdateEtudiantComponent } from './update-etudiant/update-etudiant.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';


import {MatPaginatorModule} from '@angular/material/paginator';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { NgxPaginationModule } from 'ngx-pagination';
import { DetailComponent } from './detail/detail.component';
import { DetailEtudiantComponent } from './detail/detail-etudiant/detail-etudiant.component'; 
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MaEtudiantdirectiveDirective } from './madirective.directive';




@NgModule({
  declarations: [
    EtudiantComponent,
    AjouterEtudiantComponent,
    UpdateEtudiantComponent,
    DetailComponent,
    DetailEtudiantComponent,
    MaEtudiantdirectiveDirective
    
  ],
  imports: [
    CommonModule,
    EtudiantRoutingModule,
    FormsModule,
    MatPaginatorModule, 
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    
  
  ]
})
export class EtudiantModule { }
