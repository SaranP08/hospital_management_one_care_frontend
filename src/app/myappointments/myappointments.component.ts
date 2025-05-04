import { Component } from '@angular/core';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
  styleUrls: ['./myappointments.component.scss']
})
export class MyappointmentsComponent {
  orderData: {
    orderId: number;
    date: Date,
    products: String,
    price: number,
    status: String,

  }[] = [{
    orderId: 1,
    date: new Date(),
    products: 'Parecetomol(X2)',
    price: 20,
    status: 'Out for Delivery'
  }];
  displayedColumns: string[] = ['orderId', 'date', 'products', 'price', 'status'];
  dataSource = this.orderData;
}
