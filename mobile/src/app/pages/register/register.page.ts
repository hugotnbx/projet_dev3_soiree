import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Form, NgForm } from '@angular/forms';
import { Profil } from 'src/app/interfaces/profil';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router) { }

  ngOnInit() {
  }
  register(form:NgForm){
    if (form.value.confirm == form.value.password){
      this.authService.register(form.value).subscribe((res) => {
        this.router.navigateByUrl('login');
      });
    }
    else{
      console.log("mdp ne match pas")
    }
  }

  login(form:NgForm){
    this.authService.login(form.value).subscribe((res)=>{
      this.router.navigateByUrl('');
    });
  }

}
