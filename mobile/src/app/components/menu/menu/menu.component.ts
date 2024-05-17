import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
   id:any;
  
  

  constructor( private authService: AuthService, private router: Router , private http: HttpClient) {
   

  }
  readApi(URL:string){
    return this.http.get(URL);
  }
  verifId(){
    this.readApi(`${environment.api}/events/verif/${this.id}`)
    .subscribe((data) =>{
      return this.router.navigateByUrl(`/rejoindre/${data}`);
  }),
  (error: any) => {
    
    
  }
}

  logout(){
    this.router.navigateByUrl('login');
    return this.authService.logout();
  }
}
