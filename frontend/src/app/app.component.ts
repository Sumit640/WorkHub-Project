import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'WorkHub';

  selectedFeature: string = 'home';
  
  displayFeature(feature: string) {
    this.selectedFeature = feature;
  }

}
