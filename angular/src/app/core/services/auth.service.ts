import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  signupUser(data: any) {
    return this.httpClient.post(
      `${this.baseUrl}/user/signup`,
      data
    );
  }

  signupStudent(data: any) {
    console.log("Authservice username : " + data.username)
    console.log("Authservice username : " + data.email)

    return this.httpClient.post(
      `${this.baseUrl}/students/signup`,
      data
    );
  }
}
