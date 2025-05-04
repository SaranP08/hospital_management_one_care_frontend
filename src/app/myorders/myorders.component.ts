import { Component, OnInit } from '@angular/core';
import { MyordersService } from './myorders.service';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Purchase } from '../types/common-type';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {

  orderData: Purchase[] = [];
  isLoading: boolean = false;
  displayedColumns: string[] = ['sno', 'date', 'products', 'price', 'status'];
  dataSource = this.orderData;
  constructor(private myOrdersService: MyordersService, private authService: AuthService, private matSnackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    this.isLoading = true;
    this.authService.getUserId().subscribe((id) => {
      this.myOrdersService.getOrders(id).subscribe((data) => {
        this.isLoading = false
        if (data?.data) {
          this.orderData = data.data;
          this.dataSource = this.orderData;
        }

      });
    }, (error) => {
      this.isLoading = false;
      this.matSnackBar.open("Please try again later", "", {
        duration: 2000
      });
    })
  }
}
