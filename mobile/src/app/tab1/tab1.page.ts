import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tab2Page } from '../tab2/tab2.page';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  events:any;
  tableEvents: any[] = [];

  datePlusGrand(date1:Date, date2:Date) {
    var date1Obj = new Date(date1);
    var date2Obj = new Date(date2);
  
    return (date1Obj.getTime() + 86400000) >= date2Obj.getTime();
  }

  constructor(public http:HttpClient) {

    this.readApi(`${environment.api}/events`)
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

  ngOnInit() {
    // ...
  }

  ngOnDestroy() {
    //
    
  }
}