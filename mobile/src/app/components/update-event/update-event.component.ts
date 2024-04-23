import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss'],
})
export class UpdateEventComponent implements OnInit {

  event:any = {};
  eventDateTime!: string;
  maxDate: string;
  minDate: string;

  constructor(public http:HttpClient,private route: ActivatedRoute,private router: Router) {
    const paramValue = this.route.snapshot.paramMap.get('id');
    this.readApi(`http://localhost:64000/events/${paramValue}`)
    .subscribe((data) =>{
      this.event= data;
      this.dateEvent();
    });
    const now = new Date();
    const maxYear = now.getFullYear() + 10;
    this.maxDate = new Date(maxYear, 11, 31).toISOString().slice(0, 10);
    this.minDate = new Date().toISOString().slice(0, 10);
  }

  dateEvent(){
    this.eventDateTime = this.event.date + 'T' + this.event.heure;
  }

  onDateTimeChange(event: CustomEvent) {
    this.eventDateTime = event.detail.value;
    const dateTime = new Date(this.eventDateTime);
    const date = dateTime.toLocaleDateString('fr-CA');
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    this.event.date = date;
    this.event.heure = time;

    console.log("Date :", this.event.date);
    console.log("Heure :", this.event.heure);
  }


  ngOnInit() {}

  readApi(URL: string) {
    return this.http.get(URL);
  }

  updateEvent() {
    this.http.put<any>('http://localhost:64000/events/' + this.event.id, this.event)
      .subscribe(response => {
        this.router.navigateByUrl(`/evenement/${this.event.id}`);
      });
  }
}