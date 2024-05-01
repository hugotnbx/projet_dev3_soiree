import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Evenement } from '../interfaces/evenement';

@Injectable({
  providedIn: 'root',
})

export class ManageEventService {
    private newEventSubject = new Subject<Evenement>();
    private updatedEventSubject = new Subject<Evenement>();

    newEvent$ = this.newEventSubject.asObservable();
    updatedEvent$ = this.updatedEventSubject.asObservable();

    shareNewEvent(newEvent: Evenement){
      this.newEventSubject.next(newEvent);
    }

    shareUpdatedEvent(updatedEvent: Evenement){
      this.updatedEventSubject.next(updatedEvent);
    }
}