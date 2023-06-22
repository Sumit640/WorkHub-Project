import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacilityComponent } from './facility/facility.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserOrderStatisticsComponent } from './user-order-statistics/user-order-statistics.component';
import { UserOrderHistoryComponent } from './user-order-history/user-order-history.component';
import { UserFoodOrderComponent } from './user-food-order/user-food-order.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: FacilityComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'user/statistics', component: UserOrderStatisticsComponent, canActivate: [AuthGuard] },
  { path: 'user/history', component: UserOrderHistoryComponent, canActivate: [AuthGuard] },
  { path: 'user/order', component: UserFoodOrderComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
