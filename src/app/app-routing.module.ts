import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { CustomerComponent } from './customer/customer.component';
import { OrdersComponent } from './orders/orders.component';


const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'signin', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'hierarchy', component: HierarchyComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'orders', component: OrdersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
