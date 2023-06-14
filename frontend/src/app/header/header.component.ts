import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() selectFeatureHeader = 'home';

  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    // this.selectFeatureHeader = feature;
    this.featureSelected.emit(feature);
  }
}
