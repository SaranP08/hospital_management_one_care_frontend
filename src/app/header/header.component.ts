import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignoutdialogComponent } from '../signoutdialog/signoutdialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AuthService, private matDialog: MatDialog) {
    this.updateLoginStatus();

  }

  updateLoginStatus(): void {
    this.authService.isLoggedIn().subscribe((data) => {
      this.isLoggedIn = data;
    })
  }

  signOut(): void {


    const dialog = this.matDialog.open(SignoutdialogComponent, {
      width: '600px',
      minHeight: '180px'
    });

    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.authService.logout();
        this.updateLoginStatus();
        this.router.navigate(['home']);
      }
    })
  }
}
