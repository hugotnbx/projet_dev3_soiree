import { Component, OnInit } from '@angular/core';
import { profil } from './profil';
import { Profil } from 'src/app/interfaces/profil';
import { json } from 'express';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-creation-profil',
  templateUrl: './creation-profil.component.html',
  styleUrls: ['./creation-profil.component.scss'],
})
export class CreationProfilComponent implements OnInit {

  userData:Profil={
    idProfil:"",
    name:"",
    firstName:"",
    mail:"",
    numberPhone:"",
    address:"",
    instagram:"",
    facebook:"",
    description:"",
    bank:""
  }
  
  constructor(public http:HttpClient) {}

  newProfil:any;
  
  creationProfil() {
    this.newProfil=new profil(this.userData);
    this.http.post<any>(`${environment.api}/users`, this.newProfil)
      .subscribe(response => {
        console.log(response); 
      });
  }

  ngOnInit() {}
}