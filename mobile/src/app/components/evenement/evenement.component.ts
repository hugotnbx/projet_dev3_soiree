import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ManageEventService } from 'src/app/services/manage-event.service';
import { Evenement } from 'src/app/interfaces/evenement';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss'],
})
export class EvenementComponent  implements OnInit {

  event:any;
  eventprofil:any;

  constructor(public http: HttpClient, private route: ActivatedRoute, private manageEventService: ManageEventService) {}

  ngOnInit() {
    this.loadEventInfos();

    this.manageEventService.updatedEvent$.subscribe((updatedEvent: Evenement) => {
      this.event = updatedEvent;
    });
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
    if (!status || typeof status !== 'string' || !/^[a-zA-Z]+$/.test(status)) {
        throw new Error('Le statut est invalide.');
    } 

    return `./assets/role/${status}.png`;
  }

  /* isAdmin(role: string): boolean {
    return role === 'Admin';
  } */
}