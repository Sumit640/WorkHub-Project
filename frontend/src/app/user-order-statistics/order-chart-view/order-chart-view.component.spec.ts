import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChartViewComponent } from './order-chart-view.component';

describe('OrderChartViewComponent', () => {
  let component: OrderChartViewComponent;
  let fixture: ComponentFixture<OrderChartViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderChartViewComponent]
    });
    fixture = TestBed.createComponent(OrderChartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
