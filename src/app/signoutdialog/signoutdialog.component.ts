import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signoutdialog',
  templateUrl: './signoutdialog.component.html',
  styleUrls: ['./signoutdialog.component.scss']
})
export class SignoutdialogComponent {
  constructor(private _dialogRef: MatDialogRef<SignoutdialogComponent>) { }

  closeDialog(): void {
    this._dialogRef.close({
      isLogOut: true
    });
  }

}
