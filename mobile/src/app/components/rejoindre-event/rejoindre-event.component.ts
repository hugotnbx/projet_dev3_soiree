import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
//import { IonViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-rejoindre-event',
  templateUrl: './rejoindre-event.component.html',
  styleUrls: ['./rejoindre-event.component.scss'],
})
export class RejoindreEventComponent  implements OnInit {
  
  aliments:any;

  Rejoindre= {
    idEvent:125,
    idProfil:"neut",
    idContribution:"",
    idStatus:1,
    role:""
  };

  constructor(public http:HttpClient) {}
  
  readApi(URL:string){
    return this.http.get(URL);
  }

  ngOnInit() {
    this.readApi(`${environment.api}/contributions`)
    .subscribe((data) =>{
    
      this.aliments= data;
    
      for(let long = 0 ; long < this.aliments.length ; long++){
        this.aliments[long].selected = false;
      }
      console.log(this.aliments);
    });
  }

  selectedOption: number = 1;

  selectOption(option: number) {
    this.selectedOption = option;
    console.log(this.selectedOption);
  }

  toggleSelection(ali: { selected: boolean; }) {
    ali.selected = !ali.selected;
  }

  getTotal() {
    let total = 0;
    if (this.aliments && typeof this.aliments === 'object') {
      for (let key in this.aliments) {
        if (this.aliments.hasOwnProperty(key) && this.aliments[key].selected) {
          total += parseFloat(this.aliments[key].prix);
        }
      }
    } else {
      console.error("Erreur : this.aliments n'est pas un objet valide");
      return "0.00";
    }
    return total.toFixed(2);
  }
  

  rejoindreEvent() {
    for(let long = 0 ; long < this.aliments.length ; long++){
      if (this.aliments[long].selected == true){
        console.log(this.aliments[0].idContribution);
        this.Rejoindre.idContribution=this.aliments[long].idContribution;
        this.Rejoindre.idStatus = this.selectedOption;
        console.log(this.Rejoindre);
        this.http.post<any>(`${environment.api}/users-relations`, this.Rejoindre)
        .subscribe(response => {
          console.log(response); 
        });
      }
    }
  }
}