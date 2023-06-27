import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  totalOrders = 10;
  pageSizeOptions = [2,5,10,20];
  ordersPerPage = 2;
  currentPage = 1;

  constructor(public orderService: OrderService,
    public datePipe: DatePipe) {}

  ngOnInit() {
    let today: Date = new Date();
    let sevenDaysAfter = new Date();
    sevenDaysAfter.setDate(today.getDate()+7);
    this.startdate = this.datePipe.transform(today, "yyyy-MM-dd");
    this.enddate = this.datePipe.transform(sevenDaysAfter, "yyyy-MM-dd");

    this.orderService.getOrdersHistory(this.ordersPerPage,1);
    this.orderSubscription = this.orderService.getOrderUpdateListener()
    .subscribe((orderList: Order[]) => {
      this.orders = orderList;
      this.filteredOrders = this.orders.filter(order => {
        const dateOrder = this.datePipe.transform(order.orderDate,"yyyy-MM-dd");
        return this.startdate <= dateOrder && this.enddate >= dateOrder;
      });
      // this.totalOrders = this.filteredOrders.length;
    });
  }

  updateStartDate() {
    let newDate = new Date(this.startdate);
    this.startdate = this.datePipe.transform(newDate, "yyyy-MM-dd");

    this.filteredOrders = this.orders.filter(order => {
      const dateOrder = this.datePipe.transform(order.orderDate,"yyyy-MM-dd");
      return this.startdate <= dateOrder && this.enddate >= dateOrder;
    });
    // this.totalOrders = this.filteredOrders.length;
  }
 
  updateEndDate() {
    let newDate = new Date(this.enddate);
    this.enddate = this.datePipe.transform(newDate, "yyyy-MM-dd");
    
    this.filteredOrders = this.orders.filter(order => {
      const dateOrder = this.datePipe.transform(order.orderDate,"yyyy-MM-dd");
      return this.startdate <= dateOrder && this.enddate >= dateOrder;
    });
    // this.totalOrders = this.filteredOrders.length;
  }

  onPageChange(data: PageEvent) {
    this.currentPage = data.pageIndex + 1;
    this.ordersPerPage = data.pageSize;
    this.orderService.getOrdersHistory(this.ordersPerPage,this.currentPage);
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }
}
