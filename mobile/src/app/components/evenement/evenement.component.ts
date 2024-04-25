import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

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

    this.readApi(`${environment.api}/users-relations/get-user-relations/${paramValue}`).subscribe((data) => {
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

  getImageUrl(status: string): string {
    return `./assets/role/${status}.png`;
  }

  /* isAdmin(role: string): boolean {
    return role === 'Admin';
  } */
}