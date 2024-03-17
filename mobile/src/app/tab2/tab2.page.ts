import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  //constructor() {}
  
  evenement:string="";
  nomLieu:string="";
  date:string="";
  lits:number=0;
  bob:number=0;

  event:any={
    evenement:"",
    lieu:"",
    date:"",
    lits:0,
    bob:0
  };

  creationEvent(){
    this.event.evenement = this.evenement;
    this.event.lieu = this.nomLieu;
    this.event.date = this.date;
    this.event.lits = this.lits;
    this.event.bob = this.bob;
    console.log(this.event);
  }


}
