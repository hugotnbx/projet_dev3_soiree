import { Component, OnInit } from '@angular/core';
import { Tab2Page } from '../tab2/tab2.page';
import { HttpClient,HttpHeaders } from '@angular/common/http';
//import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../services/storage.service';
import { LocalStorageService } from '../services/local-storage.service';
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

  constructor(public http:HttpClient,private storage:StorageService,private localStorage:LocalStorageService) {

    this.readApi("http://localhost:64000/events")
    .subscribe((data) =>{
      console.log(data);
      //console.log(this.localStorage.getItem("ACCESS_TOKEN"));
      //console.log(`données :${data},token:${this.localStorage.getItem("ACCESS_TOKEN")}`);
      this.events= data;
      
      for(let event of this.events){
        if (this.datePlusGrand(event.date, new Date())) {
          this.tableEvents.push(event);
        }
      }
    }); 
  }

  readApi(URL:string){
    /*const headers = new HttpHeaders({
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.localStorage.getItem("ACCESS_TOKEN")}`
    });
    return this.http.get(URL,{headers: headers});*/
    return this.http.get(URL);
  }

  ngOnInit() {}
}