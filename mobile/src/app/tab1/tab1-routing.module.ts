import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
//import { EvenementComponent } from '../components/evenement/evenement.component';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    children:[
      {
        path:"evenement",
        loadChildren: () => import('../components/evenement/evenement.module').then(m => m.EvenementModule)
        
      },
      {
        path:"update",
        loadChildren: () => import('../components/update-event/update-event.module').then(m => m.UpdateModule)
        
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
