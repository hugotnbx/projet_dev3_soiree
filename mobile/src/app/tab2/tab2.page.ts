import { Component, OnInit } from '@angular/core';
import { evenement } from './tab2';
import { Evenement } from 'src/app/interfaces/evenement';
import { json } from 'express';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{
  

  maxDate: string;
  minDate: string;
  eventDateTime!: string;
  newEvent:any;
  eventData:Evenement={
    id:0,
    nom:"",
    heure:"",
    date:new Date().toISOString().slice(0, 10),
    lieu:"",
    nbrLit:0,
    nbrBob:0
  }
  
  constructor(public http:HttpClient,public router: Router) {
    const now = new Date();
    const maxYear = now.getFullYear() + 10;
    this.maxDate = new Date(maxYear, 11, 31).toISOString().slice(0, 10);
    this.minDate = new Date().toISOString().slice(0, 10);

    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    this.eventData.heure = `${hours}:${minutes}`;
  }

  onDateTimeChange(event: CustomEvent) {
    this.eventDateTime = event.detail.value;
    const dateTime = new Date(this.eventDateTime);
    const date = dateTime.toLocaleDateString('fr-CA')
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
    this.eventData.date = date;
    this.eventData.heure = time;

    console.log("Date :", this.eventData.date);
    console.log("Heure :", this.eventData.heure);
  }

  creationEvent() {
    this.newEvent=new evenement(this.eventData);
    this.http.post<any>('http://localhost:64000/events', this.newEvent)
      .subscribe(response => {
        console.log(response);
        this.router.navigateByUrl(`/tabs/tab1`);
        this.reloadTab1()
        
      });
  }

  reloadTab1() {
    this.router.navigateByUrl('/tabs/tab1', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/tabs/tab1']);
    });



}

}