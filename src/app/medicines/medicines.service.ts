import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicinesService {

  constructor(private _httpClient: HttpClient, private _configService: ConfigService) { }

  getMedicines(keyword?: String): Observable<any> {
    return this._httpClient.get(`${this._configService.apiBaseUrl}/medicines/search/${keyword ?? ''}`);
  }

  addToCart(payload: { id: string | null, product: [{ medicineId: string, qty: number }] }): Observable<any> {
    return this._httpClient.post(`${this._configService.apiBaseUrl}/cart/add`, payload);
  }
}
