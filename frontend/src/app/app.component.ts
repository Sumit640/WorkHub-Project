import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../app/auth-files/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'WorkHub';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthenticateUser();
  }

  selectedFeature: string = 'home';
  
  displayFeature(feature: string) {
    this.selectedFeature = feature;
  }

}
