import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterUniversiteComponent } from './ajouter-universite/ajouter-universite.component';
import { UniversiteComponent } from './universite/universite.component';

const routes: Routes = [  {path: "", component: UniversiteComponent
},{ path: 'AjouterUniversite', component: AjouterUniversiteComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversiteRoutingModule { }
