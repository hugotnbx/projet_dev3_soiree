import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss'],
})
export class EvenementComponent  implements OnInit {

  event:any;

  constructor(public http:HttpClient) {

    this.readApi("http://localhost:64000/accueil/1")
    .subscribe((data) =>{
      console.log(data);
      this.event= data;

    });
  }

  readApi(URL:string){
    return this.http.get(URL);

  }

  ngOnInit() {}

}
