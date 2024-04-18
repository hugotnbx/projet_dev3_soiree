import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss'],
})
export class UpdateEventComponent implements OnInit {

  event:any;
  // eventprofil:any;

  constructor(public http:HttpClient,private route: ActivatedRoute,private router: Router) {
    const paramValue = this.route.snapshot.paramMap.get('id');
    //console.log(paramValue);
    this.readApi(`http://localhost:64000/events/${paramValue}`)
    .subscribe((data) =>{
      console.log(data);
      this.event= data;
    });
    // this.readApi(`http://localhost:64000/users-relations/${paramValue}`)
    // .subscribe((data) => {
    //   console.log(data);
    //   this.eventprofil = data;
    // });
  }

  ngOnInit() {}

  readApi(URL: string) {
    return this.http.get(URL);
  }

  updateEvent() {
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

  
    this.http.put<any>('http://localhost:64000/events/' + this.event.id, this.event)
      .subscribe(response => {
        console.log(response); 
        this.router.navigate(['']);
        console.log("L'Evenement a bien été modifié !");
      });

  }
  
  
  // isAdmin(role: string): boolean {
  //   return role === 'Admin';
  // }
}