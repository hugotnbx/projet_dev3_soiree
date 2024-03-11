import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreationComponent} from "./components/creation/creation.component";
import {AccueilComponent} from "./components/accueil/accueil.component";
import {EvenementComponent} from "./components/evenement/evenement.component";
import {InvitationsComponent} from "./components/invitations/invitations.component";
import {ProfilComponent} from "./components/profil/profil.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {path:"",component:AccueilComponent},
  {path:"accueil",component:AccueilComponent},
  {path:"creation",component:CreationComponent},
  {path:"profil",component:ProfilComponent},
  {path:"evenement",component:EvenementComponent},
  {path:"invitations",component:InvitationsComponent},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
