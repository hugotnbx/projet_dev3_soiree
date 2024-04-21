import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  constructor( private authService: AuthService, private router: Router) {}

  logout(){
    this.router.navigateByUrl('login');
    return this.authService.logout();
  }
}
