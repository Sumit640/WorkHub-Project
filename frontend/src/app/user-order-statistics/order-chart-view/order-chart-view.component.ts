import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/order.model';
import { OrderService } from 'src/app/order.service';
import { OrderType } from './order-type.model';

@Component({
  selector: 'app-order-chart-view',
  templateUrl: './order-chart-view.component.html',
  styleUrls: ['./order-chart-view.component.css']
})
export class OrderChartViewComponent implements OnInit, OnDestroy {
  public ordersChart: Order[] = [];
  public filteredOrders: Order[] = [];
  private orderSubscription: Subscription;
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    datasets: []
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };
  startdate: string = '';
  enddate: string = '';
  orderArray: OrderType[];
  dateArray = [];

  constructor(public orderService: OrderService,public datePipe: DatePipe) {}

  initializeOrderData() {
    this.dateArray = [];
    this.orderArray = [];
    const currentDate = new Date(this.startdate);
    const endDate = new Date(this.enddate);

    while(currentDate <= endDate){
      let currentDateString = this.datePipe.transform(currentDate,"yyyy-MM-dd");
      this.dateArray.push(currentDateString);
      let order = this.filteredOrders.find(item => {
        return this.datePipe.transform(item.orderDate,"yyyy-MM-dd") === currentDateString
      });
      
      if(order === undefined) {
        this.orderArray.push({
          breakfastVeg: 0,
          lunchVeg: 0,
          lunchNonveg: 0
        });
      }
      else {
        let newOrder : OrderType = {
          breakfastVeg: 0,
          lunchVeg: 0,
          lunchNonveg: 0
        };
        newOrder.breakfastVeg = order.breakfastType == 'breakfast-veg' ? 100 : 0;
        newOrder.lunchVeg = order.lunchType == 'lunch-veg' ? 100 : 0;
        newOrder.lunchNonveg = order.lunchType == 'lunch-nonveg' ? 100 : 0;
        this.orderArray.push(newOrder);
      } 
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  ngOnInit(): void {
    let today: Date = new Date();
    let sevenDaysAfter = new Date();
    sevenDaysAfter.setDate(today.getDate()+7);
    this.startdate = this.datePipe.transform(today, "yyyy-MM-dd");
    this.enddate = this.datePipe.transform(sevenDaysAfter, "yyyy-MM-dd");

    this.orderService.getTotalOrders();
    this.orderSubscription = this.orderService.getOrderUpdateListener()
    .subscribe((orderList: Order[]) => {
      this.ordersChart = orderList;
      this.filteredOrders = this.ordersChart.filter(order => {
        const dateOrder = this.datePipe.transform(order.orderDate,"yyyy-MM-dd");
        return this.startdate <= dateOrder && this.enddate >= dateOrder;
      });
      this.initializeOrderData();
    });
      
    setTimeout(() => {
      this.createChart(this.orderArray);
    }, 2000);

  }
  
  createChart(orderArray: OrderType[]) {
    const breakfastVegArray = orderArray.map(order => order.breakfastVeg);
    const lunchVegArray = orderArray.map(order => order.lunchVeg);
    const lunchNonVegArray = orderArray.map(order => order.lunchNonveg);

    this.barChartData = {
      labels: this.dateArray,
      datasets: [
        { data: breakfastVegArray,label: 'BreakFast (Veg)'},
        { data: lunchVegArray,label: 'Lunch (Veg)'},
        { data: lunchNonVegArray,label: 'Lunch (Non-Veg)'}
      ]
    };
  }

  filterOrdersByDate() {
    this.filteredOrders = this.ordersChart.filter(order => {
      const dateOrder = this.datePipe.transform(order.orderDate,"yyyy-MM-dd");
      return this.startdate <= dateOrder && this.enddate >= dateOrder;
    });
    

    this.initializeOrderData();

    setTimeout(() => {
      this.createChart(this.orderArray);
    }, 2000);
  }

  updateStartDate() {
    let newStartDate = new Date(this.startdate);
    this.startdate = this.datePipe.transform(newStartDate, "yyyy-MM-dd");

    this.filterOrdersByDate();
  }

  updateEndDate() {
    let newEndDate = new Date(this.enddate);
    this.enddate = this.datePipe.transform(newEndDate, "yyyy-MM-dd");

    this.filterOrdersByDate();
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }
}

