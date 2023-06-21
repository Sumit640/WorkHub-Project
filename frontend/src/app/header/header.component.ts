import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() selectFeatureHeader = 'home';
  userAuthenticated: boolean = false;
  private authListenerSubscription: Subscription; 

  constructor(private authService: AuthService) {}

  @Output() featureSelected = new EventEmitter<string>();

  ngOnInit() {
    this.authListenerSubscription = this.authService
      .getAuthenticateStatus()
      .subscribe(isAuthenticated => {
        this.userAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
     this.authListenerSubscription.unsubscribe(); 
  }

  onSelect(feature: string) {
    // this.selectFeatureHeader = feature;
    this.featureSelected.emit(feature);
  }
}
