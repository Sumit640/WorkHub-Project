import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  // @ViewChild('registerForm') registerForm: NgForm;

  constructor(private router: Router,
    private route: ActivatedRoute) {}

  onSubmitRegister() {
    
    alert("Successfully registered at WorkHub!!");
    this.router.navigate(['../','login'],{relativeTo: this.route});
  }
}
