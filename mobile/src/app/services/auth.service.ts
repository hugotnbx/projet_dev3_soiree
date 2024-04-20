import { Injectable, OnInit } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { profil } from '../components/profil/creation-profil/profil';
// import { Storage } from '@ionic/storage-angular';
import { Profil } from '../interfaces/profil';
import { AuthResponse } from '../interfaces/auth-response';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:64000';
  authSubject  =  new  BehaviorSubject(false)
  newProfil:any;
  
  constructor(private  httpClient:  HttpClient,/* private  storage:  StorageService, */private localStorage:LocalStorageService) { }

  register(user: Profil): Observable<AuthResponse> {
    this.newProfil = new profil(user);
    console.log(user);
    console.log(this.newProfil);
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/users`, this.newProfil).pipe(
      tap(async (res:  AuthResponse ) => {
        
        if (res) {
          //await this.storage.create();
          //await this.storage.clear();
          //await this.storage.set("ACCESS_TOKEN", res.access_token).then(() => console.log("stocké"));
          //await this.storage.set("EXPIRES_IN", res.expires_in);
          this.localStorage.setItem("ACCESS_TOKEN", res.access_token);;
          this.authSubject.next(true);
        }
      })
    );
  }

  login(user: Profil): Observable<AuthResponse> {
    this.newProfil = new profil(user);
    console.log(this.newProfil)
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/auth/login`, this.newProfil).pipe(
      tap(async (res: AuthResponse) => {
        console.log(res);
        //console.log(res.user);
        if (res) {
          /*
          //await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          //await this.storage.set("EXPIRES_IN", res.user.expires_in);
          await this.storage.create();
          await this.storage.clear();
          await this.storage.set("ACCESS_TOKEN", res.access_token).then(() => console.log("stocké"));
          */
          this.localStorage.setItem("ACCESS_TOKEN", res.access_token);;
          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
    //await this.storage.remove("ACCESS_TOKEN");
    //await this.storage.remove("EXPIRES_IN");
    this.localStorage.removeItem("ACCESS_TOKEN");

    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
