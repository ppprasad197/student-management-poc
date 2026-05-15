import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.httpClient.post<any>(
      `${this.baseUrl}/login`,
      body.toString(),
      {
        headers,
        withCredentials: true
      }
    )
  }


  logout() {
    return this.httpClient.post(
      `${this.baseUrl}/logout`, {},
      {
        withCredentials: true
      }
    );
  }


  signupUser(data: any) {
    return this.httpClient.post(
      `${this.baseUrl}/user/signup`,
      data,
      { responseType: 'text' }
    );
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(
      `${this.baseUrl}/user/currentUser`,
      {
        withCredentials: true
      }
    );
  }
}
