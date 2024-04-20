import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router) { }

  ngOnInit() {
  }

  login(form:NgForm){
    this.authService.login(form.value).subscribe((res)=>{
      if(this.authService.isLoggedIn()){
        this.router.navigateByUrl('');
      }
      //this.router.navigateByUrl('');
    });
  }

}
