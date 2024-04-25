import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss'],
})
export class EvenementComponent  implements OnInit {

  event:any;
  eventprofil:any;

  constructor(public http: HttpClient, private route: ActivatedRoute , public socialSharing : SocialSharing ) {}

  ngOnInit() {
    this.loadEventInfos();
  }

  loadEventInfos(){
    const paramValue = this.route.snapshot.paramMap.get('id');

    this.readApi(`${environment.api}/events/${paramValue}`).subscribe((data) => {
      console.log(data);
      this.event = data;
    });

    this.readApi(`${environment.api}/users-relations/${paramValue}`).subscribe((data) => {
      console.log(data);
      this.eventprofil = data;
    });
  }

  refreshEventInfos(eventInfos:any) {
    this.loadEventInfos();

    setTimeout(() => {
      eventInfos.target.complete();
    }, 2000);
  }

  readApi(URL: string) {
    return this.http.get(URL);
  }

  getImageUrl(role: string): string {
    return `./assets/role/${role}.png`;
  }

  /* isAdmin(role: string): boolean {
    return role === 'Admin';
  } */
  /*async sShare(){
    await Share.share({
      title: "Participer à l'événement",
      text: `Je suis intéressé par votre événement "${this.event.name}"`,
      url: `iziplan//rejoindre`
    })
  }*/

  sShare() {
    const title = 'Partage de lien';
    const message = 'Jetez un œil à ce lien intéressant :';
    const url = 'http://expand-consulting.be/';
    const image = './assets/icon/iziplan_logo.png'

    this.socialSharing.share(message, title, image, url)
      .then(() => console.log('Partage réussi !'))
      .catch((error: any) => console.error('Erreur lors du partage :', error));
  }
}