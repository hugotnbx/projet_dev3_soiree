import { Component, OnInit } from '@angular/core';
import { evenement } from './tab2';
import { Evenement } from 'src/app/interfaces/evenement';
import { json } from 'express';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  eventData:Evenement={
    id:0,
    nom:"",
    heure:"",
    date:"",
    lieu:"",
    nbrLit:0,
    nbrBob:0
  }
  constructor(public http:HttpClient) { }

  newEvent:any;

  creationEvent() {
    this.newEvent=new evenement(this.eventData);
    this.http.post<any>('http://localhost:64000/accueil', this.newEvent)
      .subscribe(response => {
        console.log(response);
      });
  }

  ngOnInit() {}

}

