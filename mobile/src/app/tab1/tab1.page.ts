import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { ButtonStateService } from '../services/button-state.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  events: any;
  tableEvents: any[] = [];
  userId:any;
  private _isButtonDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isButtonDisabled$: Observable<boolean> = this._isButtonDisabled.asObservable();
  isButtonDisabled: boolean = false;

  constructor(public http:HttpClient, private localStorage:LocalStorageService, private router: Router, private buttonStateService: ButtonStateService) {
  }

  disableButton() {
    this._isButtonDisabled.next(true);
  }

  enableButton() {
    this._isButtonDisabled.next(false);
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

      this.tableEvents = []; 

      for(let event of this.events){
        if (this.datePlusGrand(event.date, new Date())) {
          this.tableEvents.push(event);
        }
      }
      this.tableEvents.sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.heure);
        const dateB = new Date(b.date + ' ' + b.heure);
        return dateA.getTime() - dateB.getTime();
      });
    console.log(this.tableEvents);
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
    /*const token = localStorage.getItem("ACCESS_TOKEN");
    this.userId = token?.split(".")
    const currentTime = Math.floor(Date.now() / 1000)
    this.userId=JSON.parse(atob(this.userId))
    //console.log(`user exp : ${this.userId.exp} and current time : ${currentTime}`)*/
    if(!this.localStorage.getItem('ACCESS_TOKEN') /*|| this.userId.exp < currentTime*/){
      this.router.navigateByUrl('login');
    }
    this.loadEvents();

    this.buttonStateService.isButtonDisabled$.subscribe((isDisabled: boolean) => {
      this.isButtonDisabled = isDisabled;
    });
  }
}