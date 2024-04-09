import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  events:any;
  tableEvents: any[] = [];

  datePlusGrand(date1:Date, date2:Date) {
    var date1Obj = new Date(date1);
    var date2Obj = new Date(date2);
  
    return date1Obj.getDate() >= date2Obj.getDate();
  }

  constructor(public http:HttpClient) {

    this.readApi("http://localhost:64000/accueil/")
    .subscribe((data) =>{
      console.log(data);
      this.events= data;
      
      for(let event of this.events){
        if (this.datePlusGrand(event.date, new Date())) {
          this.tableEvents.push(event);
        }
      }
    }); 
  }

  readApi(URL:string){
    return this.http.get(URL);
  }
}

