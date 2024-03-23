import { Component, OnInit } from '@angular/core';
import { profil } from './profil';

@Component({
  selector: 'app-creation-profil',
  templateUrl: './creation-profil.component.html',
  styleUrls: ['./creation-profil.component.scss'],
})
export class CreationProfilComponent{
  nom:string="";
  prenom:string="";
  insta:string="";
  facebook:string="";
  tel:string="";
  description:string="";
  adresse:string="";
  newProfil:profil = new profil(this.nom,this.prenom,this.insta,this.facebook,this.tel,this.description,this.adresse);

  creationProfil(){
    this.newProfil= new profil(this.nom,this.prenom,this.insta,this.facebook,this.tel,this.description,this.adresse);
    console.log(this.newProfil);
  }
}  /*implements OnInit {

  constructor() { }

  ngOnInit() {}

}*/
