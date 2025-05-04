import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from './signup.service';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  errorMsg: String = '';
  constructor(private snackBar: MatSnackBar, private router: Router, private _formBuilder: FormBuilder, private signUpService: SignupService, private authService: AuthService) {
    this.signUpForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {

    this.signUpForm.get('email')?.valueChanges.subscribe((data) => {
      this.errorMsg = '';
    })
  }

  signUp(): void {
    const body = this.signUpForm.value;
    this.signUpService.signup(body).subscribe((data) => {
      const isLoggedIn = this.authService.addAuthentication(data.accessToken, data.userId);
      if (isLoggedIn) {
        this.router.navigate(['/home']);
      }
    }, (error) => {
      this.errorMsg = error.error.error;
      if (!this.errorMsg) {
        this.snackBar.open("Please try again later", "", {
          duration: 2000
        });
      }
    });
  }
}
