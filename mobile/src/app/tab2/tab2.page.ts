import { Component, OnInit } from '@angular/core';
import { evenement, relation } from './tab2';
import { Evenement } from 'src/app/interfaces/evenement';
import { json } from 'express';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Relation } from '../interfaces/relation';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  userId:any;

  eventData:Evenement={
    id:0,
    nom:"",
    heure:"",
    date:new Date().toISOString().slice(0, 10), 
    lieu:"",
    nbrLit:0,
    nbrBob:0
  }

  relationData:Relation={
    idProfil:0,
    idEvent:0,
    idContribution:1,
    idStatus:3,
  }

  maxDate: string;
  minDate: string;
  
  constructor(public http:HttpClient, private router: Router, private localStorage:LocalStorageService) {
    const now = new Date();
    const maxYear = now.getFullYear() + 10; 
    this.maxDate = new Date(maxYear, 11, 31).toISOString().slice(0, 10);
    this.minDate = new Date().toISOString().slice(0, 10);


    const token = localStorage.getItem("ACCESS_TOKEN");
    this.userId = token?.split(".")
    this.userId=JSON.parse(atob(this.userId[1]))
    this.relationData.idProfil=this.userId.username;
    console.log(this.userId.username);
  }

  eventDateTime!: string;

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

  newEvent:any;
  newRelation:any;
  errorMessage: string = '';

  creationEvent() {

    if (this.eventData.nbrLit > 10) {
      this.errorMessage = "Vous ne pouvez pas proposer plus de 10 lits";      
      return; 
    }

    this.newEvent = new evenement(this.eventData);
  
    this.http.post<any>(`${environment.api}/events`, this.newEvent)
      .subscribe(eventResponse => {
        console.log(eventResponse); 
        this.relationData.idEvent=eventResponse.id;
  
        this.newRelation = new relation(this.relationData);
  
        this.http.post<any>(`${environment.api}/users-relations`, this.newRelation)
          .subscribe(relationResponse => {
            console.log(relationResponse);
          });
        
          this.router.navigateByUrl(`/evenement/${eventResponse.id}`);
      });

    this.errorMessage = '';
  }

  ngOnInit() {}

}