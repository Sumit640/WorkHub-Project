import { Injectable } from "@angular/core";
import { Order } from "./order.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private orderUpdated = new Subject<Order[]>();

  getOrdersHistory() {
    return [...this.orders];
  }

  getOrderUpdateListener() {
    return this.orderUpdated.asObservable();
  }

  addOrder(newOrder: Order) {
    this.orders.push(newOrder);
    this.orderUpdated.next([...this.orders]);
  }


}