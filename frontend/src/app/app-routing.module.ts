import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacilityComponent } from './facility/facility.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: FacilityComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
