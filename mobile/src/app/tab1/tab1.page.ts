import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  events:any;

  constructor(public http:HttpClient) {
    
    this.readApi("http://localhost:64000/accueil/")
    .subscribe((data) =>{
      console.log(data);
      this.events= data;

    });
  }

  readApi(URL:string){
    return this.http.get(URL);
  }
}

