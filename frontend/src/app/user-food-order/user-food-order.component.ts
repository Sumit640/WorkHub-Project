import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-user-food-order',
  templateUrl: './user-food-order.component.html',
  styleUrls: ['./user-food-order.component.css']
})
export class UserFoodOrderComponent implements OnInit {
  initialDate = new Date();
  orderId: string;
  orderForm: FormGroup;

  constructor(public orderService: OrderService) {}

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

  getOrderDay(orderDate: Date): string {
    const date = new Date(orderDate); 
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const orderDay = daysOfWeek[date.getDay()]; 
  
    return orderDay;
  }

  onOrderSubmit() {
    const newOrder = {
      'employeeId': 'E11',
      'orderId': this.orderId,
      'orderDate': this.orderForm.value['orderDate'],
      'orderDay': this.getOrderDay(this.orderForm.value['orderDate']),
      'breakfastType': this.orderForm.value['breakfastType'],
      'lunchType': this.orderForm.value['lunchType']
    };

    this.orderService.addOrder(newOrder);
    this.orderForm.reset();
  }


}
