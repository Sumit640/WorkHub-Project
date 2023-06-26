import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { DatePipe } from '@angular/common';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { FacilityComponent } from './facility/facility.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AuthInterceptor } from './auth-files/auth-interceptor';
import { UserOrderStatisticsComponent } from './user-order-statistics/user-order-statistics.component';
import { UserFoodOrderComponent } from './user-food-order/user-food-order.component';
import { UserOrderHistoryComponent } from './user-order-history/user-order-history.component';
import { OrderChartViewComponent } from './user-order-statistics/order-chart-view/order-chart-view.component';
import { OrderTabularViewComponent } from './user-order-statistics/order-tabular-view/order-tabular-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    FacilityComponent,
    RegisterUserComponent,
    UserFoodOrderComponent,
    UserOrderStatisticsComponent,
    UserOrderHistoryComponent,
    OrderChartViewComponent,
    OrderTabularViewComponent,
    UserProfileComponent
  ],
  
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
