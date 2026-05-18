import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>(
      `${this.baseUrl}/users`
    );
  }

  approveUser(id: number) {
    return this.http.post<User>(
      `${this.baseUrl}/approveUser/${id}`,
      {}
    );
  }

  deleteUser(id: number) {
    return this.http.delete(
      `${this.baseUrl}/delete/${id}`
    );
  }

  updateUser(id: number, user: Partial<User>) {
    return this.http.put<User>(
      `${this.baseUrl}/${id}`,
      user
    );
  }
}
