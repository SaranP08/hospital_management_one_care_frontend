import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyordersService {

  constructor(private configService: ConfigService, private authService: AuthService, private httpClient: HttpClient) { }

  getOrders(userId: string | null): Observable<any> {
    return this.httpClient.get<any>(`${this.configService.apiBaseUrl}/orders/${userId}`, { headers: this.authService.headers })
  }
}
