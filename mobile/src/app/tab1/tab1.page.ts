import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public http:HttpClient) {
    
    /*let data = fetch('http://localhost:3000/accueil')
    .then((response)=> response.json())
    .catch((error)=>{console.log("Erreur de chargement des données")});
    console.log(data)*/
    
    this.readApi("http://localhost:3000/accueil")
    .subscribe((data) =>{
      console.log(data);

    });
  }

  readApi(URL:string){
    return this.http.get(URL);

  }
 
  
  /*events:any[]=[
    {nom:"event1",desc:"ganf",date:"11/02/2023"},
    {nom:"MathildeMahBabe",desc:"ganf",date:"11/02/2023"}
  ]*/


}

