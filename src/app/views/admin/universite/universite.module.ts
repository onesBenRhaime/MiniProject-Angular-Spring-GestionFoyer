import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { UniversiteRoutingModule } from './universite-routing.module';
import { UniversiteComponent } from './universite/universite.component';
import { FormsModule } from '@angular/forms';
import { AjouterUniversiteComponent } from './ajouter-universite/ajouter-universite.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatButtonModule } from '@angular/material/button';
import { HighlightDirective } from './highlight.directive';




@NgModule({
  declarations: [
    UniversiteComponent,
    AjouterUniversiteComponent,
    HighlightDirective


    
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    UniversiteRoutingModule,
    MatIconModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatButtonModule,


  ]
})
export class UniversiteModule { }
