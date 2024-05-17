import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rejoindre-event',
  templateUrl: './rejoindre-event.component.html',
  styleUrls: ['./rejoindre-event.component.scss'],
})
export class RejoindreEventComponent  implements OnInit {
 
  showContent = false;

  Rejoindre={
    idProfil:1,
    idContribution:0,
    idEvent:0,
    idStatus:0
  };
  code : any;
  errorMessage: string = '';

  constructor(public http:HttpClient,private route :ActivatedRoute) {
    
  }
  ngOnInit() {
  }

  aliments:any; 
  selectedOption: number = 1;

  verifications() {
    this.http.get(`${environment.api}/events/verif/${this.code}`)
      .subscribe((data) => {
        let keys = Object.values(data);
        console.log(keys)
      
        this.aliments = { ...data };
        console.log("data", data);
        for (let long = 0; long < this.aliments[0].usersRelations.length; long++) {
          this.aliments[0].usersRelations[long].contribution.selected = false;
        }
        this.showContent = true;
        console.log("aliments :", this.aliments[0].usersRelations);
      },
      error => {
        this.errorMessage = "Cet événement n'existe pas.";
      });
  }

    
  
  selectOption(option: number) {
    this.selectedOption = option;
    console.log(this.selectedOption);
  } 

  toggleSelection(ali: { selected: boolean; }) {
    ali.selected = !ali.selected;
  } 


  rejoindreEvent() {
    this.Rejoindre.idStatus = this.selectedOption;
    this.Rejoindre.idEvent = this.aliments[0].id
    for(let long = 0 ; long < this.aliments[0].usersRelations.length ; long++){
      if (this.aliments[0].usersRelations[long].contribution.selected == true){
        console.log(this.aliments[0].usersRelations[long].idContribution);
        this.Rejoindre.idContribution=this.aliments[0].usersRelations[long].idContribution;
        console.log(this.Rejoindre);
        this.http.put<any>(`${environment.api}/users-relations/${this.Rejoindre.idEvent}/${this.Rejoindre.idContribution}`, this.Rejoindre)
        .subscribe(response => {
          console.log(response); 
        });
      }
    }
  }
}