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
    this.readApi(`http://localhost:64000/accueil/${paramValue}`)
    .subscribe((data) =>{
      console.log(data);
      this.event= data;
    });
    // this.readApi(`http://localhost:64000/event-profil/${paramValue}`)
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
    // Envoyer une requête PUT avec les données de l'événement
    this.http.put<any>('http://localhost:64000/accueil/' + this.event.id, this.event)
      .subscribe(response => {
        console.log(response); 
        window.location.reload();
      });
  }
  // isAdmin(role: string): boolean {
  //   return role === 'Admin';
  // }
}