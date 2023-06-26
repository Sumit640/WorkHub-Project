import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-files/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  constructor(private router: Router,private route: ActivatedRoute,
    public authService: AuthService) {}

  onSubmitRegister(form: NgForm) {
    if(form.invalid) {
      return;
    }

    this.authService.createUser(form.value.name,form.value.username,form.value.role,form.value.email,form.value.password);

    setTimeout(() => {
      this.router.navigate(['../','login'],{relativeTo: this.route});
    }, 1000);
  }
}
