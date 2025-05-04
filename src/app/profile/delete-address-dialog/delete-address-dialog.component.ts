import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-address-dialog',
  templateUrl: './delete-address-dialog.component.html',
  styleUrls: ['./delete-address-dialog.component.scss']
})
export class DeleteAddressDialogComponent {

  constructor(private dialogRef: MatDialogRef<DeleteAddressDialogComponent>) {

  }
}
