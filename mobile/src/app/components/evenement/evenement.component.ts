import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss'],
})
export class EvenementComponent  implements OnInit {

  event:any;

  constructor(public http:HttpClient,private route: ActivatedRoute) {
    const paramValue = this.route.snapshot.paramMap.get('id');
    //console.log(paramValue);
    this.readApi(`http://localhost:64000/accueil/${paramValue}`)
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
