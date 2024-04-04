import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  eventprofil: any;

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.readApi("http://localhost:3000/event-profil/")
      .subscribe((data) => {
        console.log(data);
        this.eventprofil = data;
      });
  }

  readApi(URL: string) {
    return this.http.get(URL);
  }

  getImageUrl(role: string): string {
    // Logique pour déterminer l'URL de l'image en fonction du rôle
    // Par exemple :
    if (role === 'Admin') {
      return './assets/role/admin.png'; // Chemin de l'image pour le rôle Admin
    } else if (role === 'Bob') {
      return './assets/role/bob.png'; // Chemin de l'image pour le rôle User
    } else if (role === 'place_voiture') {
      return './assets/role/place_voiture.png'; // Chemin de l'image pour le rôle User
    } else if (role === 'hote') {
      return './assets/role/hote.png'; // Chemin de l'image pour le rôle User
    } else if (role === 'lit_dispo') {
      return './assets/role/lit.png'; // Chemin de l'image pour le rôle User
    } else if (role === 'lit_dispo'){
      return './assets/role/covoiturage.png'; // Image par défaut si aucun rôle ne correspond
    } else {
      return './assets/role/pas_de_role.png'
    }
  }
}
