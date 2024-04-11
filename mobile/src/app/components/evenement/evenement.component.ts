import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss'],
})
export class EvenementComponent  implements OnInit {

  event:any;
  eventprofil:any;

  constructor(public http:HttpClient,private route: ActivatedRoute) {
    const paramValue = this.route.snapshot.paramMap.get('id');

    this.readApi(`http://localhost:64000/events/${paramValue}`)
    .subscribe((data) =>{
      console.log(data);
      this.event= data;
    });

    this.readApi(`http://localhost:64000/users-relations/${paramValue}`)
    .subscribe((data) => {
      console.log(data);
      this.eventprofil = data;
    });
  }

  ngOnInit() {}

  readApi(URL: string) {
    return this.http.get(URL);
  }

  getImageUrl(role: string): string {
    // Logique pour déterminer l'URL de l'image en fonction du rôle
    // Par exemple :
    if (role === 'admin') {
      return './assets/role/admin.png'; // Chemin de l'image pour le rôle Admin
    } else if (role === 'Bob') {
      return './assets/role/bob.png'; // Chemin de l'image pour le rôle User
    } else if (role === 'place_voiture') {
      return './assets/role/place_voiture.png'; // Chemin de l'image pour le rôle User
    } else if (role === 'hote') {
      return './assets/role/hote.png'; // Chemin de l'image pour le rôle User
    } else if (role === 'lit_dispo') {
      return './assets/role/lit.png'; // Chemin de l'image pour le rôle User
    } else if (role === 'covoiturage'){
      return './assets/role/covoiturage.png'; // Image par défaut si aucun rôle ne correspond
    } else {
      return './assets/role/pas_de_role.png'
    }
  }
  isAdmin(role: string): boolean {
    return role === 'Admin';
  }
}