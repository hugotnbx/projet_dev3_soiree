import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  profil:any;
  userId :any;

  constructor(public http:HttpClient) {
    this.loadProfil();
  }

  loadProfil(){
    const token = localStorage.getItem("ACCESS_TOKEN");
    this.userId = token?.split(".")
    //console.log(atob(this.userId[1]))
    this.userId=JSON.parse(atob(this.userId[1]))
    console.log(this.userId.username);
    this.readApi(`${environment.api}/users/${this.userId.username}`)
    .subscribe((data) =>{
      console.log(data);
      this.profil= data;
    });
  }

  refreshProfil(profil:any) {
    this.loadProfil();

    setTimeout(() => {
      profil.target.complete();
    }, 2000);
  }

  readApi(URL:string){
    return this.http.get(URL);
  }
}