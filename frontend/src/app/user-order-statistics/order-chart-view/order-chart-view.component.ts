import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  public orders: Order[] = [];
  public filteredOrders: Order[] = [];
  private orderSubscription: Subscription;
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    datasets: []
  };
  startdate: string = '';
  enddate: string = '';
  orderArray: OrderType[];
  dateArray = [];

  constructor(public orderService: OrderService,
    public datePipe: DatePipe) {}

  fetchChartData(startdate: string,enddate: string) {
    this.orderService.getTotalOrders();
    this.orderSubscription = this.orderService.getOrderUpdateListener()
    .subscribe((orderList: Order[]) => {
      this.orders = orderList;
      
      this.filteredOrders = this.orders.filter(order => {
        const dateOrder = this.datePipe.transform(order.orderDate,"yyyy-MM-dd");
        return startdate <= dateOrder && enddate >= dateOrder;
      });

      this.dateArray = [];
      this.orderArray = [];
      const currentDate = new Date(this.startdate);
      const endDate = new Date(this.enddate);

      while (currentDate <= endDate) {
        const dateString = this.datePipe.transform(new Date(currentDate),"yyyy-MM-dd");
        this.dateArray.push(dateString);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      for(let order of this.filteredOrders){
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
    });
  }

  ngOnInit(): void {
    let today: Date = new Date();
    let sevenDaysAfter = new Date();
    sevenDaysAfter.setDate(today.getDate()+7);
    this.startdate = this.datePipe.transform(today, "yyyy-MM-dd");
    this.enddate = this.datePipe.transform(sevenDaysAfter, "yyyy-MM-dd");

    this.fetchChartData(this.startdate,this.enddate);
      
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

  updateStartDate() {
    let newDate = new Date(this.startdate);
    this.startdate = this.datePipe.transform(newDate, "yyyy-MM-dd");

    this.filteredOrders = this.orders.filter(order => {
      const dateOrder = this.datePipe.transform(order.orderDate,"yyyy-MM-dd");
      return this.startdate <= dateOrder && this.enddate >= dateOrder;
    });
    
    this.dateArray = [];
    this.orderArray = [];
    let currentDate = new Date(this.startdate);
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
      
    setTimeout(() => {
      this.createChart(this.orderArray);
    }, 2000);
  }
 
  updateEndDate() {
    let newDate = new Date(this.enddate);
    this.enddate = this.datePipe.transform(newDate, "yyyy-MM-dd");
    
    this.filteredOrders = this.orders.filter(order => {
      const dateOrder = this.datePipe.transform(order.orderDate,"yyyy-MM-dd");
      return this.startdate <= dateOrder && this.enddate >= dateOrder;
    });

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
      
    setTimeout(() => {
      this.createChart(this.orderArray);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }
}

