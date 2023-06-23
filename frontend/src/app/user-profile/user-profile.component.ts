import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: any;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.userProfile = this.authService.getUserInfo();
  }
}
