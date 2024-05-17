import { Injectable } from '@angular/core';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { LocalNotificationSchema } from '@capacitor/local-notifications';
import { LocalNotificationDescriptor } from '@capacitor/local-notifications';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() {}
  async scheduleNotification(notifs:ScheduleOptions){
    /*let options:ScheduleOptions={
      notifications:[
        {
          id:1,
          title:"Reminder Notification",
          body:"Coucou",
          largeBody:"coucou",
          summaryText:"KOUKOUW"
        }
      ]
    }*/
    

    try{
      await LocalNotifications.schedule(notifs);
    }
    catch(ex){
      alert(JSON.stringify(ex));
    }

  }
}
