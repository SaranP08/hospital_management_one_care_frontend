import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class MybookingsService {
  accessToken: string | null = '';

  constructor(private authService: AuthService, private httpClient: HttpClient, private configService: ConfigService) {

  }


  getBookings(patientId: string | null): Observable<any> {

    return this.httpClient.get<any[]>(`${this.configService.apiBaseUrl}/patient/mybookings/${patientId}`, { headers: this.authService.headers })
      .pipe(
        mergeMap(bookings => {
          const bookingDetails$ = bookings.map(booking =>
            this.httpClient.get(`${this.configService.apiBaseUrl}/doctor/info/${booking.doctorId}`, { headers: this.authService.headers })
              .pipe(map(doctorDetails => ({ ...booking, doctorDetails })))
          );
          return forkJoin(bookingDetails$);
        })
      );
  }

  cancelBooking(payload: { doctorId: String, scheduleId: String, slotId: String }): Observable<any> {
    return this.httpClient.post(`${this.configService.apiBaseUrl}/patient/cancelBooking`, payload, { headers: this.authService.headers });
  }



}
