import { Routes } from '@angular/router';
import {AccueilComponent} from "./components/accueil/accueil.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

export const routes: Routes = [
  {path:"", component:AccueilComponent},
  { path: '**', component: PageNotFoundComponent }
];
