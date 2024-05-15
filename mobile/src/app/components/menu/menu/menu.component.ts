import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  userId :any;

  constructor(public http:HttpClient, private authService: AuthService, private router: Router, private localStorage:LocalStorageService) {}

  logout(){
    this.router.navigateByUrl('login');
    return this.authService.logout();
  }

  unsubscribe(){
    const token = localStorage.getItem("ACCESS_TOKEN");
    this.userId = token?.split(".");
    this.userId=JSON.parse(atob(this.userId[1]));
    
    this.http.delete(`${environment.api}/users/${this.userId.username}`).subscribe({
      next: () => {
        this.logout(); 
       
        alert('Votre compte a été supprimé avec succès. Nous somme tristes de vous voir partir.');
      },
      error: (err) => {
        console.error('Error deleting user:', err);

        alert('Une erreur est survenue, veuillez réesayer plus tard.');
      }
    });
  }
}
