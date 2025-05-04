import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BookingComponent } from './booking/booking.component';
import { DialogComponent } from './dialog/dialog.component';
import { ServicesComponent } from './services/services.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { MedicinesDialogComponent } from './medicines-dialog/medicines-dialog.component';
import { CartComponent } from './cart/cart.component';
import { MyordersComponent } from './myorders/myorders.component';
import { MyappointmentsComponent } from './myappointments/myappointments.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { DoctorloginComponent } from './doctorlogin/doctorlogin.component';
import { SignoutdialogComponent } from './signoutdialog/signoutdialog.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ProfileComponent } from './profile/profile.component';
import { DeleteAddressDialogComponent } from './profile/delete-address-dialog/delete-address-dialog.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { MybookingsComponent } from './mybookings/mybookings.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    HeaderComponent,
    BookingComponent,
    DialogComponent,
    ServicesComponent,
    MedicinesComponent,
    MedicinesDialogComponent,
    CartComponent,
    MyordersComponent,
    MyappointmentsComponent,
    MainpageComponent,
    DoctorloginComponent,
    SignoutdialogComponent,
    ChangepasswordComponent,
    ProfileComponent,
    DeleteAddressDialogComponent,
    CartPageComponent,
    CheckoutPageComponent,
    MybookingsComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTableModule,
    MatChipsModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatRadioModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatStepperModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
