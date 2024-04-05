import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab5Page } from './tab5.page';
//import { EvenementComponent } from '../components/evenement/evenement.component';

const routes: Routes = [
  {
    path: '',
    component: Tab5Page,
    children:[
      {
        path:"evenement",
        loadChildren: () => import('../components/evenement/evenement.module').then(m => m.EvenementModule)
        
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab5PageRoutingModule {}
