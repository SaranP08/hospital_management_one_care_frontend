import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-medicines-dialog',
  templateUrl: './medicines-dialog.component.html',
  styleUrls: ['./medicines-dialog.component.scss']
})
export class MedicinesDialogComponent implements OnInit {

  quantity: FormControl;
  price: number = 0;
  userId: string | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _dialogRef: MatDialogRef<MedicinesDialogComponent>, private authService: AuthService) {
    this.quantity = new FormControl(1, [Validators.max(data.qty)]);
    this.authService.getUserId().subscribe((data) => {
      this.userId = data;
    })
  }
  ngOnInit(): void {

    this.price = this.data.cost;

    // this.quantity.valueChanges.subscribe((data) => {

    //   this.price = this.data.cost * data;
    // })
  }


  addProducts(): void {

    const payload = {
      product: [{
        medicineId: this.data._id,
        qty: this.quantity.value
      }]
    };

    this._dialogRef.close(payload)
  }
}
