import { Component, OnInit } from '@angular/core';
import { profil } from './profil';
import { Profil } from 'src/app/interfaces/profil';

@Component({
  selector: 'app-creation-profil',
  templateUrl: './creation-profil.component.html',
  styleUrls: ['./creation-profil.component.scss'],
})
export class CreationProfilComponent implements OnInit {

  //constructor() { }
  userData:Profil={
    name:"",
    firstName:"",
    mail:"",
    numberPhone:"",
    address:"",
    instagram:"",
    facebook:"",
    description:"",
  }
  
  newProfil:profil = new profil(this.userData);

  creationProfil(){
    this.newProfil= new profil(this.userData);
    console.log(this.newProfil);
  }

  ngOnInit() {
    
  }

}
