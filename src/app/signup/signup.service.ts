import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private configService: ConfigService, private httpClient: HttpClient) { }

  signup(body: { firstName: String, lastName: String, gender: String, age: Number, email: String, password: String }): Observable<any> {
    return this.httpClient.post(`${this.configService.apiBaseUrl}/patient/register`, body);
  }
}
