import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { ManageUserService } from '../services/manage-user.service';
import { Profil } from '../interfaces/profil';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit{
  profil:any;
  userId :any;
  constructor(public http:HttpClient, private authService: AuthService, private router: Router,private localStorage:LocalStorageService, private manageUserService: ManageUserService) {}

  loadProfil(){
    const token = localStorage.getItem("ACCESS_TOKEN");
    this.userId = token?.split(".")
    //console.log(atob(this.userId[1]))
    this.userId=JSON.parse(atob(this.userId[1]))
    console.log(this.userId.username);
    const currentTime = Math.floor(Date.now() / 1000)
    if(!this.localStorage.getItem('ACCESS_TOKEN') || this.userId.exp < currentTime){
      this.router.navigateByUrl('login');
    }
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

  ngOnInit(): void {
    this.loadProfil();

    this.manageUserService.updatedProfil$.subscribe((updatedProfil: Profil) => {
      this.profil = updatedProfil;
    });
  }
}