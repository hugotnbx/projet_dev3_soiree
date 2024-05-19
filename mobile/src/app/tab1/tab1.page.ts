import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { ManageEventService } from '../services/manage-event.service';
import { Evenement } from '../interfaces/evenement';
import { ButtonStateService } from '../services/button-state.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationsService } from '../services/notifications.service';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { LocalNotificationSchema } from '@capacitor/local-notifications';
import { LocalNotificationDescriptor } from '@capacitor/local-notifications';
import { EvenementComponent } from '../components/evenement/evenement.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  events: any;
  tableEvents: any[] = [];
  userId:any;
  notifs:any;
  
  
  private _isButtonDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isButtonDisabled$: Observable<boolean> = this._isButtonDisabled.asObservable();
  isButtonDisabled: boolean = false;

  constructor(public http:HttpClient, private localStorage:LocalStorageService, private router: Router, private manageEventService: ManageEventService, private buttonStateService: ButtonStateService, private notif:NotificationsService) {

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
    this.callNotif();
  }

  refreshEvents(events:any) {
    this.loadEvents();
    this.callNotif();
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
  oneDayDiff(date1: Date): boolean {
    const date1Time = new Date(date1).getTime();
    const date2Time = new Date().getTime();
    const differenceInMilliseconds = Math.abs(date1Time - date2Time);
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return differenceInDays === 1;
  }
  callNotif(){
    let id = 0;
    this.notifs = {notifications:[]};
    /*this.events.array.forEach((event:any) => {
      if (this.oneDayDiff(event.date)){
        let notification = {
          id:id,
          title:event.nom,
          body:`${event.nom} à ${event?.heure}`,
          largeBody:`Ne passez pas à coté de ${event.nom} à ${event?.heure}`,
          summaryText:`${event.nom}`
        }
        id+=1;
        this.notifs["notifications"].push(notification);
      }
    });*/
    if(this.tableEvents.length!==0){
      //alert(`${this.tableEvents}`)
      this.tableEvents.forEach((event:any) => {
        /*if(this.oneDayDiff(event.date)){
          
        }*/
        let dixMinAvant = new Date(new Date(`${event?.date}T${event?.heure}`).getTime() - 10 * 60 * 1000);
        let notification = {
          id:id,
          title:event.nom,
          body:`${event?.nom} à ${event?.heure}`,
          largeBody:`Ne passez pas à coté de ${event?.nom} à ${event?.heure}`,
          summaryText:`${event.nom}`,
          schedule: { at: dixMinAvant },
          //smallIcon:"ic_launcher_round"

        }
        id+=1;
        this.notifs["notifications"].push(notification);
        
      });
      this.notif.scheduleNotification(this.notifs);

    }
    
  }

  ngOnInit() {
    /*for(let event of this.events){
      let notification = {
        id:id,
        title:event.nom,
        body:`${event.nom} à ${event?.heure}`,
        largeBody:`Ne passez pas à coté de ${event.nom} à ${event?.heure}`,
        summaryText:`${event.nom}`
      }
      id+=1;
      this.notifs["notifications"].push(notification);
      alert(`${this.notifs["notifications"]}`)
    }
    this.notif.scheduleNotification(this.notifs);*/

    if(!this.localStorage.getItem('ACCESS_TOKEN') /*|| this.userId.exp < currentTime*/){
      this.router.navigateByUrl('login');
    }

    this.loadEvents();

    this.manageEventService.updatedEvent$.subscribe((updatedEvent: Evenement) => {
      let index = 0;
      for(let event of this.tableEvents){
        if(event.id == updatedEvent.id){
          this.tableEvents[index] = updatedEvent;
        }
        index++;
      }
      
      this.tableEvents.sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.heure);
        const dateB = new Date(b.date + ' ' + b.heure);
        return dateA.getTime() - dateB.getTime();
      });
    });

    this.manageEventService.newEvent$.subscribe((newEvent: Evenement) => {
      this.tableEvents.push(newEvent);

      this.tableEvents.sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.heure);
        const dateB = new Date(b.date + ' ' + b.heure);
        return dateA.getTime() - dateB.getTime();
      });
    });
    
    this.buttonStateService.isButtonDisabled$.subscribe((isDisabled: boolean) => {
      this.isButtonDisabled = isDisabled;
    });

    this.callNotif();

  }
}