import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserPageResponse } from '../models/user_page.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

  getAllUsers(page: number, size: number) {
    return this.http.get<UserPageResponse>(
      `${this.baseUrl}/users?page=${page}&size=${size}`
    )
  }

  approveUser(id: number) {
    return this.http.post(
      `${this.baseUrl}/approveUser/${id}`,
      {},
      {
        withCredentials: true,
        responseType: 'text'
      }
    );
  }

  deleteUser(id: number) {
    return this.http.delete(
      `${this.baseUrl}/delete/${id}`,
      {
        responseType: 'text'
      }
    );
  }

  updateUser(id: number, user: Partial<User>) {
    return this.http.put<User>(
      `${this.baseUrl}/${id}`,
      user
    );
  }
}
