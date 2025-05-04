import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartPageService {

  constructor(private configService: ConfigService, private httpClient: HttpClient) { }


  getCarts(userId: string | null): Observable<any> {
    return this.httpClient.get(`${this.configService.apiBaseUrl}/cart/${userId}`);
  }


  updateCart(id: string | null, payload: { medicineId: String, qty: number }): Observable<any> {
    return this.httpClient.patch(`${this.configService.apiBaseUrl}/cart/${id}`, payload);
  }

  deleteProductFromCart(id: string | null, medicineId: String): Observable<any> {
    return this.httpClient.delete(`${this.configService.apiBaseUrl}/cart/${id}/${medicineId}`);
  }
}
