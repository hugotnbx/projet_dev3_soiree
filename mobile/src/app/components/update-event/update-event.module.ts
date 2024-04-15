import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UpdateEventComponent } from './update-event.component';
import { Router } from 'express';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module'
import { Evenement } from "src/app/interfaces/evenement";


@NgModule({
  declarations: [UpdateEventComponent],
  imports: [
    IonicModule,
    CommonModule,
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    
  ],
  exports:[RouterModule]
})
export class UpdateModule { }
