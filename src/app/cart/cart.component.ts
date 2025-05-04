import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Output() buttonClicked = new EventEmitter<{ name: String; price: number; qty: number }[]>();
  cartData: { name: String; price: number; qty: number }[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _snackbar: MatSnackBar, private _matDialogRef: MatDialogRef<CartComponent>) {

  }
  ngOnInit(): void {
    this.cartData = this.data;
  }

  removeItem(index: number) {
    this.cartData.splice(index, 1);

    this.buttonClicked.emit(this.cartData);

  }
  cancel(): void {
    this._matDialogRef.close();
  }
  purchase(): void {
    this._snackbar.open('Purchased Successfully', 'Dismiss', {
      duration: 2000
    });


    this.cartData = [];
    this.buttonClicked.emit(this.cartData);
    this._matDialogRef.close();

  }
}
