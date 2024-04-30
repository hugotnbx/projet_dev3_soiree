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
  eventDateTime!: string;
  maxDate: string;
  minDate: string;
  updateEventDisabled: boolean = true;

  constructor(public http:HttpClient,private route: ActivatedRoute,private router: Router) {
    const paramValue = this.route.snapshot.paramMap.get('id');
    //console.log(paramValue);
    this.readApi(`${environment.api}/events/${paramValue}`)
    .subscribe((data) =>{
      this.event= data;
      this.dateEvent();
    });
    const now = new Date();
    const maxYear = now.getFullYear() + 10;
    this.maxDate = new Date(maxYear, 11, 31).toISOString().slice(0, 10);
    this.minDate = new Date().toISOString().slice(0, 10);
  }

  dateEvent(){
    this.eventDateTime = this.event.date + 'T' + this.event.heure;
  }

  onDateTimeChange(event: CustomEvent) {
    this.eventDateTime = event.detail.value;
    const dateTime = new Date(this.eventDateTime);
    const date = dateTime.toLocaleDateString('fr-CA');
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    this.event.date = date;
    this.event.heure = time;

    console.log("Date :", this.event.date);
    console.log("Heure :", this.event.heure);
  }


  ngOnInit() {}

  readApi(URL: string) {
    return this.http.get(URL);
  }
  errorDetected: boolean = false;

checkErrors() {
    this.errorDetected = false; 

    if (!this.event.nom || !this.event.lieu || this.event.nbrBob < 0 || !this.event.nbrLit || !this.event.nbrBob || this.event.nbrLit < 0 || this.event.nbrBob > 99 || this.event.nbrLit > 99) {
        this.errorDetected = true; 
    }
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










