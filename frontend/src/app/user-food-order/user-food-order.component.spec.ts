import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFoodOrderComponent } from './user-food-order.component';

describe('UserFoodOrderComponent', () => {
  let component: UserFoodOrderComponent;
  let fixture: ComponentFixture<UserFoodOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFoodOrderComponent]
    });
    fixture = TestBed.createComponent(UserFoodOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
