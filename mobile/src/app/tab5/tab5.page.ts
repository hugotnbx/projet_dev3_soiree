import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})

/*// Définition de l'interface pour la structure des événements
interface EventObject {
  // Définissez les propriétés nécessaires pour chaque événement
  date: Date;
  // Ajoutez d'autres propriétés selon vos besoins
}*/

export class Tab5Page {
  events:any;
  tablePastEvents: any[] = [];

  datePlusPetite(date1:Date, date2:Date) {
    var date1Obj = new Date(date1);
    var date2Obj = new Date(date2);
    
    // Comparer les valeurs numériques des dates (en millisecondes) pour voir si l'une est plus petite que l'autre
    return date1Obj.getTime() < date2Obj.getTime();
  }

  constructor(public http:HttpClient) {

    
    
    this.readApi("http://localhost:64000/accueil/")
    .subscribe((data) =>{
      console.log(data);
      this.events= data;
      
      for(let event of this.events){
        if (this.datePlusPetite(event.date, new Date())) {
          this.tablePastEvents.push(event);
          
        }
      }
      console.log(this.tablePastEvents)
      //tablePastEvents = data;
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

