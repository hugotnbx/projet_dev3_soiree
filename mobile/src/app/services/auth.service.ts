import { Injectable, OnInit } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { profil } from '../components/profil/creation-profil/profil';
// import { Storage } from '@ionic/storage-angular';
import { Profil } from '../interfaces/profil';
import { AuthResponse } from '../interfaces/auth-response';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS:  string  =  `${environment.api}`;
  authSubject  =  new  BehaviorSubject(false)
  newProfil:any;
  
  constructor(private  httpClient:  HttpClient,private localStorage:LocalStorageService) { }

  register(user: Profil): Observable<AuthResponse> {
    this.newProfil = new profil(user);
    console.log(user);
    console.log(this.newProfil);
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/users`, this.newProfil).pipe(
      tap(async (res:  AuthResponse ) => {
        
        if (res) {
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
