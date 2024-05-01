import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EvenementComponent } from './components/evenement/evenement.component';
import { CreationProfilComponent } from './components/profil/creation-profil/creation-profil.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilEventComponent } from './components/profil-event/profil-event.component';
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { RejoindreEventComponent } from './components/rejoindre-event/rejoindre-event.component';
import { UpdateProfilComponent } from './components/update-profil/update-profil.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },

  {
    path:'evenement/:id',
    component: EvenementComponent
  },

  {
    path:"creation",
    component: CreationProfilComponent
  },

  {
    path:"profil",
    component: LoginComponent
  },

  {
    path:'profil-event/:id',
    component: ProfilEventComponent
  }, 

  {
    path:'update-event/:id',
    component: UpdateEventComponent
  },

  {
    path:"rejoindre",
    component: RejoindreEventComponent
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'update-profil',
    component : UpdateProfilComponent
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
