import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})

export class Tab5Page {
  events:any;
  tablePastEvents: any[] = [];

  datePlusPetite(date1:Date, date2:Date) {
    var date1Obj = new Date(date1);
    var date2Obj = new Date(date2);
  
    return (date1Obj.getTime() + 86400000) < date2Obj.getTime();
  }

  constructor(public http:HttpClient) {

    this.readApi("http://localhost:64000/events")
    .subscribe((data) =>{
      console.log(data);
      this.events= data;
      
      for(let event of this.events){
        if (this.datePlusPetite(event.date, new Date())) {
          this.tablePastEvents.push(event);
        }
      }
      this.tablePastEvents.sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.heure);
        const dateB = new Date(b.date + ' ' + b.heure);
        return dateA.getTime() - dateB.getTime();
      });
      console.log(this.tablePastEvents);
    }); 
  }

  readApi(URL:string){
    return this.http.get(URL);
  }
}