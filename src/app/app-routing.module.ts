import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from '../app/views/front/user/guard/auth.guard';
import { LoginComponent } from '../app/views/front/user/login/login.component';
import { RegisterComponent } from '../app/views/front/user/register/register.component';
import { HomeComponent } from './views/front/home/home/home.component';


const routes: Routes = [
  {component:LoginComponent,path:'login'},
  {component:RegisterComponent,path:'register'}, 

  {path:"profil", canActivate:[AuthGuard], loadChildren:()=>import("./views/front/profil/profil.module").then(m=>m.ProfilModule)},
  
  {path:"", component:FrontLayoutComponent, children:[
       {path:"", loadChildren:()=>import("./views/front/home/home.module").then(m=>m.HomeModule)},
       {path:"user", canActivate:[AuthGuard], loadChildren:()=>import("./views/front/user/user.module").then(m=>m.UserModule)},
  ]},
  {path:"admin", canActivate:[AuthGuard],component: AdminLayoutComponent, children: [
       
       {path:"dashboard", loadChildren:()=>import ("./views/admin/dashboard/dashboard.module").then(m=>m.DashboardModule)},    
       {path:"universite",  canActivate:[AuthGuard] ,  loadChildren:()=>import ("./views/admin/universite/universite.module").then(m=>m.UniversiteModule)},
       {path:"foyer", canActivate:[AuthGuard] , loadChildren:()=>import ("./views/admin/foyer/foyer.module").then(m=>m.FoyerModule)},
       {path:"bloc", canActivate:[AuthGuard] ,  loadChildren:()=>import ("./views/admin/bloc/bloc.module").then(m=>m.BlocModule)},
       {path:"chambre", canActivate:[AuthGuard] ,  loadChildren:()=>import ("./views/admin/chambre/chambre.module").then(m=>m.ChambreModule)},
       {path:"reservation", canActivate:[AuthGuard] ,   loadChildren:()=>import ("./views/admin/reservation/reservation.module").then(m=>m.ReservationModule)},
       {path:"etudiant" , canActivate:[AuthGuard] , loadChildren:()=>import ("./views/admin/etudiant/etudiant.module").then(m=>m.EtudiantModule)},
  
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
