import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { profil } from '../components/profil/creation-profil/profil';
import { Storage } from  '@ionic/storage';
import { Profil } from '../interfaces/profil';
import { AuthResponse } from '../interfaces/auth-response';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:64000';
  authSubject  =  new  BehaviorSubject(false)
  newProfil:any;
  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }

  register(user: Profil): Observable<AuthResponse> {
    this.newProfil = new profil(user);
    console.log(user);
    console.log(this.newProfil);
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/users`, this.newProfil).pipe(
      tap(async (res:  AuthResponse ) => {
        
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }

  login(user: Profil): Observable<AuthResponse> {
    this.newProfil = new profil(user);
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/auth/login`, this.newProfil).pipe(
      tap(async (res: AuthResponse) => {
        console.log(res);
        //console.log(res.user);
        if (res) {
          //await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          //await this.storage.set("EXPIRES_IN", res.user.expires_in);
          await this.storage.set("ACCESS_TOKEN", res);

          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
