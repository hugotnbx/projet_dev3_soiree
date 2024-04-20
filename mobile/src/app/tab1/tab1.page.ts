import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  events: any;
  tableEvents: any[] = [];

  constructor(public http:HttpClient, private localStorage:LocalStorageService, private router: Router) {
    this.loadEvents();
  }

  loadEvents() {
    this.readApi(`${environment.api}/events`).subscribe((data) => {
      console.log(data);
      this.events = data;

      this.tableEvents = []; 

      for (let event of this.events) {
        if (this.datePlusGrand(event.date, new Date())) {
          this.tableEvents.push(event);
        }
      }
    });
  }

  refreshEvents(events:any) {
    this.loadEvents();

    setTimeout(() => {
      events.target.complete();
    }, 2000);
  }

  datePlusGrand(date1:Date, date2:Date) {
    var date1Obj = new Date(date1);
    var date2Obj = new Date(date2);
  
    return (date1Obj.getTime() + 86400000) >= date2Obj.getTime();
  }

  readApi(URL:string){
    return this.http.get(URL);
  }

  ngOnInit() {
    if(!this.localStorage.getItem('ACCESS_TOKEN')){
      this.router.navigateByUrl('login');
    }
  }
}