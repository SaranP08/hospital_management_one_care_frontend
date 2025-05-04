import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BookingComponent } from './booking/booking.component';
import { ServicesComponent } from './services/services.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { MyordersComponent } from './myorders/myorders.component';
import { MyappointmentsComponent } from './myappointments/myappointments.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { MybookingsComponent } from './mybookings/mybookings.component';

const routes: Routes = [{
  path: '', component: HomeComponent
},

{
  path: 'login', component: LoginComponent
},
{
  path: 'signup', component: SignupComponent

},
{
  path: 'home', component: HomeComponent
},
{
  path: 'services', component: ServicesComponent, canActivate: [AuthGuard]


},
{
  path: 'my-appointments', component: MyappointmentsComponent, canActivate: [AuthGuard]
},
{
  path: 'my-orders', component: MyordersComponent, canActivate: [AuthGuard]
},
{
  path: 'my-bookings', component: MybookingsComponent, canActivate: [AuthGuard]
},
{
  path: 'services/medicines', component: MedicinesComponent, canActivate: [AuthGuard]
},
{
  path: 'services/medicines/cart', component: CartPageComponent, canActivate: [AuthGuard]
},
{
  path: 'services/medicines/checkout', component: CheckoutPageComponent, canActivate: [AuthGuard]
},
{
  path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
},
{
  path: 'medical-appointment', component: BookingComponent, canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
