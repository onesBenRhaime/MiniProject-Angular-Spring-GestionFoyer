import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoyerRoutingModule } from './foyer-routing.module';
import { FoyerComponent } from './foyer/foyer.component';
import { FormsModule } from '@angular/forms';
import { AjouterFoyerComponent } from './ajouter-foyer/ajouter-foyer.component';
import { ModifierFoyerComponent } from './modifier-foyer/modifier-foyer.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AssignationBlocsComponent } from './assignation-blocs/assignation-blocs.component';
import { RouterModule } from '@angular/router';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { AfficherFoyerComponent } from './afficher-foyer/afficher-foyer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HighlightDirective } from './foyer/highlight.directive';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    FoyerComponent,
    AjouterFoyerComponent,
    ModifierFoyerComponent,
    AssignationBlocsComponent,
    AfficherFoyerComponent,
    HighlightDirective,
    ChatbotComponent,
    SidebarComponent,
    
  ],
  imports: [
    CommonModule,
    FoyerRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    RouterModule,
    NgxPaginationModule,
    SelectDropDownModule,
    MatDialogModule
    
  ]
})
export class FoyerModule { }
