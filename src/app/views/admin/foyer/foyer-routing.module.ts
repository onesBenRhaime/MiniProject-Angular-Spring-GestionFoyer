import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { RouterModule, Routes } from '@angular/router';
import { FoyerComponent } from './foyer/foyer.component';
import { AjouterFoyerComponent } from './ajouter-foyer/ajouter-foyer.component';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { ModifierFoyerComponent } from './modifier-foyer/modifier-foyer.component';
import { AssignationBlocsComponent } from './assignation-blocs/assignation-blocs.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

const routes: Routes = [  
  {path: "", component: FoyerComponent},
  { path: 'AjouterFoyer', component: AjouterFoyerComponent },
  { path: 'ModifierFoyer/:idFoyer/:nomFoyer/:capaciteFoyer', component: ModifierFoyerComponent },
  { path: 'AssignerBlocs/:idFoyer/:capaciteFoyer/:blocsDispo', component: AssignationBlocsComponent },
  {path:"Dashboard",component:DashboardComponent},
  {path:"chatbot",component:ChatbotComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoyerRoutingModule { }
