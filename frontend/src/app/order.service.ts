import { Injectable } from "@angular/core";
import { Order } from "./order.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private orderUpdated = new Subject<Order[]>();

  constructor(private http: HttpClient) {}

  getOrdersHistory() {
    this.http.get<{message: string,orders: any}>('http://localhost:3000/api/orders')
    .pipe(map((orderData) => {
      return orderData.orders.map(order => {
        return {
          orderId: order._id,
          orderDate: order.orderDate,
          orderDay: order.orderDay,
          breakfastType: order.breakfastType,
          lunchType: order.lunchType
        }
      });
    }))
    .subscribe((orderList) => {
      this.orders = orderList;
      this.orderUpdated.next([...this.orders]);
    });
  }

  getOrderUpdateListener() {
    return this.orderUpdated.asObservable();
  }

  addOrder(newOrder: Order) {
    this.http.post<{message: string}>('http://localhost:3000/api/orders',newOrder)
      .subscribe((orderResponse) => {
        console.log(orderResponse);
        this.orders.push(newOrder);
        this.orderUpdated.next([...this.orders]);
      });
  }
}