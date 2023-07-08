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
  private ordersChart: Order[] = [];
  private ordersTable: Order[] = [];
  employeeId: string;
  private orderUpdated = new Subject<Order[]>();

  constructor(private http: HttpClient,private authService: AuthService) {}

  getTotalOrders() {
    this.employeeId = this.authService.getEmployeeId();
    
    this.http.get<{message: string,orders: any}>('http://localhost:3000/api/orders')
    .pipe(map((orderData) => {
      return orderData.orders
        .filter(order => order.employeeId === this.employeeId)
        .map(order => {
        return {
          orderId: order.orderId,
          orderDate: order.orderDate,
          orderDay: order.orderDay,
          breakfastType: order.breakfastType,
          lunchType: order.lunchType
        }
      });
    }))
    .subscribe((orderList) => {
      this.ordersChart = orderList;
      this.orderUpdated.next([...this.ordersChart]);
    });
  }

  getOrdersHistory(ordersPerPage: number,currentPage : number) {
    this.employeeId = this.authService.getEmployeeId();
    const queryParams = `?&pagesize=${ordersPerPage}&page=${currentPage}`;
    
    this.http.get<{message: string,orders: any}>('http://localhost:3000/api/orders' + queryParams)
    .pipe(map((orderData) => {
      return orderData.orders
        .filter(order => order.employeeId === this.employeeId)
        .map(order => {
        return {
          orderId: order.orderId,
          orderDate: order.orderDate,
          orderDay: order.orderDay,
          breakfastType: order.breakfastType,
          lunchType: order.lunchType
        }
      });
    }))
    .subscribe((orderList) => {
      this.ordersTable = orderList;
      this.orderUpdated.next([...this.ordersTable]);
    });
  }

  getOrderUpdateListener() {
    return this.orderUpdated.asObservable();
  }

  addOrder(newOrder: Order) {
    this.http.post<{message: string}>('http://localhost:3000/api/orders',newOrder)
    .subscribe((orderResponse) => {
      this.ordersChart.push(newOrder);
      this.ordersTable.push(newOrder);
      this.orderUpdated.next([...this.ordersChart]);
      this.orderUpdated.next([...this.ordersTable]);
    });
  }
}