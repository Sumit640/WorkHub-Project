import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../order.model';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.css']
})
export class UserOrderHistoryComponent implements OnInit, OnDestroy {
  public orders: Order[] = [];
  private orderSubscription: Subscription;

  constructor(public orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getTotalOrders();
    this.orderSubscription = this.orderService.getOrderUpdateListener()
    .subscribe((orderList: Order[]) => {
      this.orders = orderList;
    });
  }

  getFormattedDate(date: any): string {
    return date.substring(0,10);
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }
}
