import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isForgetPassword: boolean = false;
  isMailSent: boolean = false;
  isChangePassword: boolean = false;
  isLoading: boolean = false;
  loginFormGroup: FormGroup;
  errorMsg: String = '';
  errorMsg2: String = '';
  errorMsg3: String = '';


  //OTP
  otpDigit1: String = '';
  otpDigit2: String = '';
  otpDigit3: String = '';
  otpDigit4: String = '';

  //Email verification
  emailForVerification: FormControl = new FormControl('', [Validators.required, Validators.email]);

  //Password updation
  newPassword: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private snackBar: MatSnackBar, private router: Router, private authService: AuthService, private _formBuilder: FormBuilder, private _loginService: LoginService, private _snackBarService: MatSnackBar) {
    this.loginFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    this.loginFormGroup.valueChanges.subscribe((data) => {
      this.errorMsg = '';

    })
    this.emailForVerification.valueChanges.subscribe((data) => {
      this.errorMsg2 = '';
    })
  }

  login(): void {
    this.isLoading = true;
    const body: { email: String, password: String } = {
      email: this.loginFormGroup.value.email,
      password: this.loginFormGroup.value.password
    };
    this._loginService.login(body).subscribe((data) => {

      const isLoggedIn = this.authService.addAuthentication(data.accessToken, data.userId);
      this.isLoading = false;
      if (isLoggedIn) {
        this.router.navigate(['/home']);
      }
    }, (error) => {
      this.isLoading = false;
      this.errorMsg = error?.error?.error;
      if (!this.errorMsg) {
        this.snackBar.open("Please try again later", "", {
          duration: 2000
        });
      }
    })
  }
  move(e: any, previous: any, current: any, next: any): void {
    this.errorMsg3 = '';
    var length = current.value.length;
    var maxLength = current.getAttribute("maxlength");


    if (length == maxLength) {
      if (next != '') {
        next.focus();
      }
    }
    if (e.key === 'Backspace') {
      if (previous != '') {
        previous.focus();
      }

    }
  }

  //Otp verification

  otpVerify(): void {
    this.isLoading = true;
    if (this.otpDigit1 !== '' && this.otpDigit2 !== '' && this.otpDigit3 !== '' && this.otpDigit4 !== '') {
      const otp = `${this.otpDigit1}${this.otpDigit2}${this.otpDigit3}${this.otpDigit4}`;
      this._loginService.otpVerification(this.emailForVerification.value, otp).subscribe((data) => {
        if (data.isVerified) {
          this.isMailSent = false;
          this.isForgetPassword = false;
          this.isChangePassword = true;
        }
        this.isLoading = false;
      }, (error) => {
        this.isLoading = false;
        this.errorMsg3 = error?.error?.error;
        if (!this.errorMsg3) {
          this.snackBar.open("Please try again later", "", {
            duration: 2000
          });
        }
      })
    }


  }

  resetPassword(): void {
    // this.isMailSent = true;
    this.isLoading = true;
    this._loginService.sendOtp(this.emailForVerification.value).subscribe((data) => {
      if (data.isSent) {
        this.isMailSent = true;
      }
      this.isLoading = false;
    }, (error) => {
      this.errorMsg2 = error?.error?.error;
      if (!this.errorMsg2) {
        this.snackBar.open("Please try again later", "", {
          duration: 2000
        });
      }
      this.isLoading = false;
    })
  }


  //Updating the password
  createNewPassword(): void {
    this.isLoading = true;
    if (this.newPassword.valid && this.confirmPassword.valid) {
      const body = {
        email: this.emailForVerification.value,
        password: this.newPassword.value,
        confirmPassword: this.confirmPassword.value
      };
      this._loginService.updatePassword(body).subscribe((data) => {
        const updated = this.authService.addAuthentication(data.accessToken, data.userId);
        if (updated) {
          this.router.navigate(['home']);
        }
        this.snackBar.open('Password updated successfully', '', {
          "duration": 2000
        });
        this.isLoading = false;
      }, (error) => {
        this.isLoading = false;
        this.snackBar.open('Error occured while updating password', '', {
          "duration": 2000
        });
      })
    }
  }
}
