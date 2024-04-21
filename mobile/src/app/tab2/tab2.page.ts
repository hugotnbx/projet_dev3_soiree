import { Component, OnInit } from '@angular/core';
import { evenement, relation } from './tab2';
import { Evenement } from 'src/app/interfaces/evenement';
import { json } from 'express';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Relation } from '../interfaces/relation';
import { LocalStorageService } from '../services/local-storage.service';

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
    date:new Date().toISOString().slice(0, 10), // Initialiser avec la date actuelle au format "YYYY-MM-DD"
    lieu:"",
    nbrLit:0,
    nbrBob:0
  }

  relationData:Relation={
    idProfil:"",
    idEvent:0,
    idContribution:1,
    idStatus:3,
    role:"admin"
  }

  maxDate: string;
  
  constructor(public http:HttpClient, private localStorage:LocalStorageService) {
    const now = new Date();
    const maxYear = now.getFullYear() + 10; //10 ans de plus que l'année actuelle
    this.maxDate = new Date(maxYear, 11, 31).toISOString().slice(0, 10); //variable maxDate pour mettre 10 années de plus que l'année actuelle dans la date du formulaire pour créer un évènement

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
    
    // Extraction de la date
    const date = dateTime.toLocaleDateString('fr-CA') // Récupération de la date

    // Extraction de l'heure locale
    const hours = dateTime.getHours(); // Récupération de l'heure
    const minutes = dateTime.getMinutes(); // Récupération des minutes

    // Création de la chaîne de caractères pour l'heure locale
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    //const time = dateTime.toISOString().split('T')[1].split('.')[0]; // Récupération de l'heure

    // Mise à jour de eventData.date et eventData.heure
    this.eventData.date = date;
    this.eventData.heure = time;

    console.log("Date :", this.eventData.date);
    console.log("Heure :", this.eventData.heure);
  }

  newEvent:any;
  newRelation:any;

  creationEvent() {
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
      });
  }

  ngOnInit() {}

}