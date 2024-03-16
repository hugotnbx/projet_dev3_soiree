import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //constructor() {}
  events:any[]=[
    {nom:"event1",desc:"ganf",date:"11/02/2023"},
    {nom:"MathildeMahBabe",desc:"ganf",date:"11/02/2023"}
  ]

}
