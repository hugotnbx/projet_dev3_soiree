import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  profil:any;
  userId :any;
  constructor(public http:HttpClient, private authService: AuthService, private router: Router) {
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

  readApi(URL:string){
    return this.http.get(URL);
  }

  logout(){
    this.router.navigateByUrl('login');
    return this.authService.logout();
  }
}