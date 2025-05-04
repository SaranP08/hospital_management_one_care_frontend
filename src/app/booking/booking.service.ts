import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _httpClient: HttpClient, private _configService: ConfigService) { }


  getBookedSlots(doctorId: String, date: String): Observable<any> {
    return this._httpClient.get(`${this._configService.apiBaseUrl}/patient/availableSlots/${date}/${doctorId}`);
  }

  getSpecialistDetails(): Observable<any> {
    return this._httpClient.get(`${this._configService.apiBaseUrl}/doctor/specializations`);
  }

  getDoctorDetails(specializedIn: String): Observable<any> {
    return this._httpClient.get(`${this._configService.apiBaseUrl}/doctor/${specializedIn}`);
  }

  scheduleAppointment(patientId: string | null, doctorId: String, payload: any): Observable<any> {
    return this._httpClient.post(`${this._configService.apiBaseUrl}/patient/slot/${patientId}/${doctorId}`, payload);
  }
}
