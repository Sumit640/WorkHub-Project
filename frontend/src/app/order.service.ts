import { Injectable } from "@angular/core";
import { Order } from "./order.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AuthService } from "../app/auth-files/auth.service";
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  employeeId: string;
  private orderUpdated = new Subject<Order[]>();

  constructor(private http: HttpClient,private authService: AuthService) {}

  getOrdersHistory() {
    this.employeeId = this.authService.getEmployeeId();
    this.http.get<{message: string,orders: any}>('http://localhost:3000/api/orders')
    .pipe(map((orderData) => {
      return orderData.orders
        .filter(order => order.employeeId === this.employeeId)
        .map(order => {
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