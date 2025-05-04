import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MedicinesDialogComponent } from '../medicines-dialog/medicines-dialog.component';
import { CartComponent } from '../cart/cart.component';
import { Medicine } from '../types/common-type';
import { MedicinesService } from './medicines.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss']
})
export class MedicinesComponent implements OnInit {
  badgeColor: string = 'red';
  medicines: Medicine[] = [];
  userId: string | null = null;
  cartItems: { name: String; price: number; qty: number }[] = [];


  searchControl: FormControl = new FormControl('');
  isLoading: boolean = false;
  constructor(private authService: AuthService, private _dialog: MatDialog, private _medicineService: MedicinesService, private snackbar: MatSnackBar) {
    this.authService.getUserId().subscribe((data) => {
      this.userId = data;
    })
  }
  openProduct(index: number): void {
    const dialogRef = this._dialog.open(MedicinesDialogComponent, {
      data: this.medicines[index],
      width: '600px',
      minHeight: '300px'
    })

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {

        data = {
          ...data,
          id: this.userId
        };
        this._medicineService.addToCart(data).subscribe((data) => {
          this.snackbar.open('Added to cart', '', {
            duration: 2000
          });
        }, (error) => {
          this.snackbar.open('Please try again later', '', {
            duration: 2000
          });
        })
        this.cartItems.push(data);
      }
    })
  }


  openCart(): void {
    const cartDialog = this._dialog.open(CartComponent, {
      data: this.cartItems,
      width: '800px',
      minHeight: '160px',

    });
    cartDialog.componentInstance.buttonClicked.subscribe((data) => {
      this.cartItems = data;
    })
  }
  ngOnInit(): void {
    this.isLoading = true;
    this._medicineService.getMedicines().subscribe((data) => {
      this.medicines = data.data;
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
      this.snackbar.open('Please try again later', '', {
        duration: 2000
      });
    });

    this.searchControl.valueChanges.pipe(debounceTime(600)).subscribe((data) => {
      this.isLoading = true;
      this._medicineService.getMedicines(data).subscribe((data) => {
        this.medicines = data.data;
        this.isLoading = false;
      }, (error) => {
        this.isLoading = false;
        this.snackbar.open('Please try again later', '', {
          duration: 2000
        });
      });
    })
  }

}
