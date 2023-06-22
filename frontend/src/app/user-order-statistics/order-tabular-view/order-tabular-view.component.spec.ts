import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTabularViewComponent } from './order-tabular-view.component';

describe('OrderTabularViewComponent', () => {
  let component: OrderTabularViewComponent;
  let fixture: ComponentFixture<OrderTabularViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderTabularViewComponent]
    });
    fixture = TestBed.createComponent(OrderTabularViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
