import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutPageService {

  constructor(private _configService: ConfigService, private httpClient: HttpClient) { }


  getAddresses(userId: string | null): Observable<any> {
    return this.httpClient.get(`${this._configService.apiBaseUrl}/patient/address/${userId}`);
  }


  purchaseProducts(userId: string | null, payload: { productIds: String[], paymentMode: String, addressId: String }): Observable<any> {
    return this.httpClient.post(`${this._configService.apiBaseUrl}/orders/${userId}`, payload);
  }
}
