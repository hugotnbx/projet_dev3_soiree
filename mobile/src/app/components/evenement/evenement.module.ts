import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EvenementComponent } from './evenement.component';
import { Router } from 'express';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: EvenementComponent },
    ])
  ],
  exports:[RouterModule]
})
export class EvenementModule { }