import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Share } from '@capacitor/share';
@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss'],
})
export class EvenementComponent  implements OnInit {

  event:any;
  eventprofil:any;

  constructor(public http: HttpClient, private route: ActivatedRoute) {}

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

  async sShare() {
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }
}