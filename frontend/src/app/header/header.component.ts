import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth-files/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthenticated: boolean = false;
  private authListenerSubscription: Subscription; 

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userAuthenticated = this.authService.getIsAuth();
    this.authListenerSubscription = this.authService.getAuthenticateStatus()
      .subscribe(isAuthenticated => {
        this.userAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListenerSubscription.unsubscribe(); 
  }

  onLogout() {
    this.authService.logout();
  }

}
