import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private accessToken$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private userId$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public headers = new HttpHeaders();
  constructor() {
    const token = sessionStorage.getItem("accessToken");
    const userId = sessionStorage.getItem("userId");

    if (token) {

      this.headers = this.headers.set("accessToken", token);
      this.accessToken$.next(token);
      this.loggedIn$.next(true);
      this.userId$.next(userId);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  getAccessToken(): Observable<string> {
    return this.accessToken$.asObservable();
  }

  getUserId(): Observable<string | null> {
    return this.userId$.asObservable();
  }

  addAuthentication(accessToken: string, userId: string): boolean {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('userId', userId);
    this.accessToken$.next(accessToken);
    this.headers = this.headers.set("accessToken", accessToken);
    this.loggedIn$.next(true);
    this.userId$.next(userId);
    return true;
  }

  logout(): void {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userId');
    this.headers = this.headers.delete("accessToken");

    this.accessToken$.next('');
    this.loggedIn$.next(false);
    this.userId$.next(null);
  }


}
