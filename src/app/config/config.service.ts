import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public apiBaseUrl: String = 'http://localhost:5000';
  constructor() { }


}
