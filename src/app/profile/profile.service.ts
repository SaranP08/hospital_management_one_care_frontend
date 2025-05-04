import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable, map } from 'rxjs';
import { Profile } from '../types/common-type';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  headers = new HttpHeaders().set("X-CSCAPI-KEY", "S3M2WjFyVmFXS1c0bkIzNEZrajgzcG5yZ3hUcEVjdlY1YlBaZkFhYw==");

  constructor(private _httpClient: HttpClient, private _configService: ConfigService) {

  }

  getProfile(userId: string | null): Observable<any> {

    return this._httpClient.get(`${this._configService.apiBaseUrl}/patient/${userId}`);
  }


  getStates(): Observable<any> {

    return this._httpClient.get<any[]>('https://api.countrystatecity.in/v1/countries/IN/states', { headers: this.headers })
      .pipe(
        map(states => states.sort((a, b) => a.name.localeCompare(b.name)))
      );
  }

  getCities(stateCode: String): Observable<any> {
    return this._httpClient.get<any[]>(`https://api.countrystatecity.in/v1/countries/IN/states/${stateCode}/cities`, { headers: this.headers })
      .pipe(map(cities => {
        if (Array.isArray(cities)) {
          return cities.map(mapcities => ({
            name: mapcities.name
          })).sort((a, b) => a.name.localeCompare(b.name));
        }
        else {
          return [];
        }
      }));
  }

  editPersonalInfo(userId: string | null, payload: any): Observable<any> {
    return this._httpClient.patch(`${this._configService.apiBaseUrl}/patient/updateProfile/${userId}`, payload);
  }

  addAddress(userId: string | null, payload: any): Observable<any> {
    return this._httpClient.post(`${this._configService.apiBaseUrl}/patient/${userId}/addAddress`, payload);
  }


  updateAddress(userId: string | null, addressId: String, payload: any): Observable<any> {
    return this._httpClient.patch(`${this._configService.apiBaseUrl}/patient/${userId}/address/${addressId}`, payload);
  }


  deleteAddress(userId: string | null, addressId: String): Observable<any> {
    return this._httpClient.delete(`${this._configService.apiBaseUrl}/patient/${userId}/address/${addressId}`);
  }
}
