import { Component, OnInit } from '@angular/core';
import { evenement } from './tab2';
import { Evenement } from 'src/app/interfaces/evenement';
import { json } from 'express';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  eventData:Evenement={
    id:0,
    nom:"",
    heure:"",
    date:new Date().toISOString().slice(0, 10), // Initialiser avec la date actuelle au format "YYYY-MM-DD"
    lieu:"",
    nbrLit:0,
    nbrBob:0
  }

maxDate: string;
  constructor(public http:HttpClient) {
    const now = new Date();
    const maxYear = now.getFullYear() + 10; //10 ans de plus que l'année actuelle
    this.maxDate = new Date(maxYear, 11, 31).toISOString().slice(0, 10); //variable maxDate pour mettre 10 années de plus que l'année actuelle dans la date du formulaire pour créer un évènement
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

  creationEvent() {
    this.newEvent=new evenement(this.eventData);
    this.http.post<any>('http://localhost:64000/events', this.newEvent)
      .subscribe(response => {
        console.log(response);
      });
  }

  ngOnInit() {}

}