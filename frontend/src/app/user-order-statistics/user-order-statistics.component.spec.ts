import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderStatisticsComponent } from './user-order-statistics.component';

describe('UserOrderStatisticsComponent', () => {
  let component: UserOrderStatisticsComponent;
  let fixture: ComponentFixture<UserOrderStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserOrderStatisticsComponent]
    });
    fixture = TestBed.createComponent(UserOrderStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
