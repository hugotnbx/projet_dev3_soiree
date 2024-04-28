import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Evenement } from '../interfaces/evenement';

@Injectable({
  providedIn: 'root',
})

export class NewEventService {
    private newEventSubject = new Subject<Evenement>();

    newEvent$ = this.newEventSubject.asObservable();

    shareNewEvent(event: Evenement){
        this.newEventSubject.next(event);
    }
}