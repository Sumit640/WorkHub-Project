import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-files/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isCorrect = true;

  constructor(public authService: AuthService) {}

  onSubmitLogin(form: NgForm) {
    if(form.invalid){
      this.isCorrect = false;
      return;
    }
    
    this.authService.loginAuth(form.value.username,form.value.password);
  }
}
