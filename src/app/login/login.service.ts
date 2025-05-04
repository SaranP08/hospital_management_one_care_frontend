import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpClient: HttpClient, private _configService: ConfigService) { }

  login(body: { email: String, password: String }): Observable<any> {
    return this._httpClient.post(`${this._configService.apiBaseUrl}/patient/login`, body)
  }

  sendOtp(email: String): Observable<any> {
    return this._httpClient.post(`${this._configService.apiBaseUrl}/patient/resetCode`, { to: email });
  }

  otpVerification(email: String, otp: String): Observable<any> {
    return this._httpClient.post(`${this._configService.apiBaseUrl}/patient/otpVerification`, { email: email, otp: otp });
  }

  updatePassword(body: { email: String, password: String, confirmPassword: String }): Observable<any> {
    return this._httpClient.post(`${this._configService.apiBaseUrl}/patient/changePassword`, body);
  }
}
