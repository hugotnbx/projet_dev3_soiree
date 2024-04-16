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

  constructor(public http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const paramValue = this.route.snapshot.paramMap.get('id');

    this.readApi(`http://localhost:64000/events/${paramValue}`).subscribe((data) => {
      console.log(data);
      this.event = data;
    });

    this.readApi(`http://localhost:64000/users-relations/${paramValue}`).subscribe((data) => {
      console.log(data);
      this.eventprofil = data;
    });
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
}