import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EvenementComponent } from './evenement.component';
import { Router } from 'express';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: EvenementComponent },
    ])
  ],
  exports:[RouterModule]
})
export class EvenementModule { }
