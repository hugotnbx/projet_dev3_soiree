import { Component, OnInit } from '@angular/core';
import { profil } from './profil';
import { Profil } from 'src/app/interfaces/profil';
import { json } from 'express';

@Component({
  selector: 'app-creation-profil',
  templateUrl: './creation-profil.component.html',
  styleUrls: ['./creation-profil.component.scss'],
})
export class CreationProfilComponent implements OnInit {

  //constructor() { }
  userData:Profil={
    id:"",
    name:"",
    firstName:"",
    mail:"",
    numberPhone:"",
    address:"",
    instagram:"",
    facebook:"",
    description:"",
  }
  
  newProfil:any;

  creationProfil(){
    this.newProfil= new profil(this.userData);
    JSON.stringify(this.newProfil);
    console.log(this.newProfil);
  }

  ngOnInit() {
    
  }

}
