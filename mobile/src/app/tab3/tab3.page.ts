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
  constructor(public http:HttpClient) {
    this.readApi(`${environment.api}/users/hugoneutre`)
    .subscribe((data) =>{
      console.log(data);
      this.profil= data;
    });
  }

  readApi(URL:string){
    return this.http.get(URL);
  }
}