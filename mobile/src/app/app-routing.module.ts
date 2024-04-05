import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { EvenementComponent } from './components/evenement/evenement.component';
import { CreationProfilComponent } from './components/profil/creation-profil/creation-profil.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },

  /*{
    path:'evenement',
    component: EvenementComponent
  },*/

  {
    path:"creation",
    component: CreationProfilComponent
  },

  {
    path:"profil",
    component: LoginComponent
  },

  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
