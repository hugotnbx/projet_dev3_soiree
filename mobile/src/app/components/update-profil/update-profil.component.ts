import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.scss'],
})
export class UpdateProfilComponent  implements OnInit {
  profil:any = {
    idProfil : '',
    username: '',
    password: '',
    name: '',
    firstName: '',
    address: '',
    mail: '',
    numberPhone: '',
    instagram: '',
    facebook: '',
    description: ''
  };
  userId :any;
  constructor(public http:HttpClient, private authService: AuthService, private router: Router,private localStorage:LocalStorageService) {}

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
    readApi(URL:string){
      return this.http.get(URL);
    }
    UpdateProfil(){
      this.http.put(`${environment.api}/users/${this.profil.idProfil}`,this.profil).subscribe(()=>{
        this.router.navigateByUrl(`/tabs/tab3`);
      })
    }
  
    ngOnInit(): void {
      this.loadProfil();
    }

}
