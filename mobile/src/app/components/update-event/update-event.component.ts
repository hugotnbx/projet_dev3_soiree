import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss'],
})
export class UpdateEventComponent implements OnInit {

  event:any = {};
  // eventprofil:any;

  eventDateTime!: string;


  constructor(public http:HttpClient,private route: ActivatedRoute,private router: Router) {
    const paramValue = this.route.snapshot.paramMap.get('id');
    //console.log(paramValue);
    this.readApi(`${environment.api}/events/${paramValue}`)
    .subscribe((data) =>{
      //console.log(data);
      this.event= data;
      this.dateEvent();
    });
    // this.readApi(`http://localhost:64000/users-relations/${paramValue}`)
    // .subscribe((data) => {
    //   console.log(data);
    //   this.eventprofil = data;
    // });
  }

  //Pour afficher la date de l'évènement par défaut au moment de modifier les infos de l'évènement
  dateEvent(){
    this.eventDateTime = this.event.date + 'T' + this.event.heure; // Format YYYY-MM-DDTHH:mm
  }

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
    this.event.date = date;
    this.event.heure = time;

    console.log("Date :", this.event.date);
    console.log("Heure :", this.event.heure);
  }


  ngOnInit() {}

  readApi(URL: string) {
    return this.http.get(URL);
  }

  updateEvent() {
    // Envoyer une requête PUT avec les données de l'événement
    this.http.put<any>(`${environment.api}/events/` + this.event.id, this.event)
      .subscribe(response => {
        //console.log(response); 
        this.router.navigateByUrl(`/evenement/${this.event.id}`)});

    if (!this.event.nom) {
      console.log("Le nom est vide");
      return; 
    }

    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(this.event.heure)) {
      console.log("Format d'heure invalide");
      return; 
    }
    const timeRegex2 = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; 
  if (!timeRegex2.test(this.event.heure)) {
    console.log("Format d'heure invalide");
    return; 
  }
  
   
    if (this.event.nbrLit < 0 || this.event.nbrLit > 99) {
      console.log("Nombre de lits invalide");
      return; 
    }
  
   
    if (this.event.nbrBob < 0 || this.event.nbrBob > 99) {
      console.log("Nombre de bobs invalide");
      return;
    }
  
   
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!this.event.lieu || specialCharsRegex.test(this.event.lieu) || this.event.lieu.length > 50) {
      console.log("Lieu invalide");
      return; 
    }
  
    if (this.event.nom.length > 40) {
      console.log("Le nom est trop long");
      return; 
    }
  }
  
  
  // isAdmin(role: string): boolean {
  //   return role === 'Admin';
  // }
}