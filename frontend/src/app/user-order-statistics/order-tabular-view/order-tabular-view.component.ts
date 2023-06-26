import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/order.model';
import { OrderService } from 'src/app/order.service';
@Component({
  selector: 'app-order-tabular-view',
  templateUrl: './order-tabular-view.component.html',
  styleUrls: ['./order-tabular-view.component.css']
})
export class OrderTabularViewComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['date', 'order-details', 'breakfast', 'lunch'];
  public orders: Order[] = [];
  public filteredOrders: Order[] = [];
  private orderSubscription: Subscription;
  startdate: string = '';
  enddate: string = '';

  constructor(public orderService: OrderService,
    public datePipe: DatePipe) {}

  ngOnInit() {
    let today: Date = new Date();
    let sevenDaysAfter = new Date();
    sevenDaysAfter.setDate(today.getDate()+7);
    this.startdate = this.datePipe.transform(today, "yyyy-MM-dd");
    this.enddate = this.datePipe.transform(sevenDaysAfter, "yyyy-MM-dd");

    this.orderService.getOrdersHistory();
    this.orderSubscription = this.orderService.getOrderUpdateListener()
    .subscribe((orderList: Order[]) => {
      this.orders = orderList;
      this.filteredOrders = this.orders.filter(order => {
        const dateOrder = this.datePipe.transform(order.orderDate,"yyyy-MM-dd");
        return this.startdate <= dateOrder && this.enddate >= dateOrder;
      });
    });
  }

  updateStartDate() {
    let newDate = new Date(this.startdate);
    this.startdate = this.datePipe.transform(newDate, "yyyy-MM-dd");

    this.filteredOrders = this.orders.filter(order => {
      const dateOrder = this.datePipe.transform(order.orderDate,"yyyy-MM-dd");
      return this.startdate <= dateOrder && this.enddate >= dateOrder;
    });
  }
 
  updateEndDate() {
    let newDate = new Date(this.enddate);
    this.enddate = this.datePipe.transform(newDate, "yyyy-MM-dd");
    
    this.filteredOrders = this.orders.filter(order => {
      const dateOrder = this.datePipe.transform(order.orderDate,"yyyy-MM-dd");
      return this.startdate <= dateOrder && this.enddate >= dateOrder;
    });
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }
}
