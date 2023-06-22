import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-food-order',
  templateUrl: './user-food-order.component.html',
  styleUrls: ['./user-food-order.component.css']
})
export class UserFoodOrderComponent {
  initialDate = new Date();
  orderId: string;
  orderDate: Date;
  orderForm: FormGroup;
  // constructor(private orderHistoryService: OrderHistoryService) {}

  ngOnInit() {
    this.orderId = 'E11' + Math.floor(Math.random()*1000);

    this.orderForm = new FormGroup({
      'orderDate' : new FormControl(null,Validators.required),
      'breakfastType': new FormControl(''),
      'lunchType': new FormControl('')
    })
  }

  getNextDate(date: Date, days: number): Date {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + days);
    return nextDate;
  }

  getOrderDay(orderDate: string): string {
    const date = new Date(orderDate); 
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const orderDay = daysOfWeek[date.getDay()]; 
  
    return orderDay;
  }

  onOrderSubmit() {

    // this.orderHistoryService.orderHistory.push({
    //   'orderDate': this.orderForm.value['orderDate'],
    //   'orderDay': this.getOrderDay(this.orderForm.value['orderDate']),
    //   'orderId': this.orderId,
    //   'breakfastType': this.orderForm.value['breakfastType'],
    //   'lunchType': this.orderForm.value['lunchType']
    // })
  }
}
