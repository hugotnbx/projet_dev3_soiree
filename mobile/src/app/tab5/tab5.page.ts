import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})

export class Tab5Page {

  events:any;
  tablePastEvents: any[] = [];
  userId:any;

  constructor(public http:HttpClient, private localStorage:LocalStorageService) {
    this.loadEvents();
  }

  loadEvents() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    this.userId = token?.split(".")
    //console.log(atob(this.userId[1]))
    this.userId=JSON.parse(atob(this.userId[1]))
    console.log(this.userId.username);

    this.readApi(`${environment.api}/events/get-event-relations/${this.userId.username}`).subscribe((data) => {
      console.log(data);
      this.events = data;

      this.tablePastEvents = []; 

      for(let event of this.events){
        if (this.datePlusPetite(event.date, new Date())) {
          this.tablePastEvents.push(event);
        }
      }
      this.tablePastEvents.sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.heure);
        const dateB = new Date(b.date + ' ' + b.heure);
        return dateA.getTime() - dateB.getTime();
      });
      console.log(this.tablePastEvents);
    }); 
  }

  refreshEvents(events:any) {
    this.loadEvents();

    setTimeout(() => {
      events.target.complete();
    }, 2000);
  }

  datePlusPetite(date1:Date, date2:Date) {
    var date1Obj = new Date(date1);
    var date2Obj = new Date(date2);
  
    return (date1Obj.getTime() + 86400000) < date2Obj.getTime();
  }

  readApi(URL:string){
    return this.http.get(URL);
  }
}