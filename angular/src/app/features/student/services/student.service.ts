import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = "http://localhost:8080/user";
  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseUrl}/students`, { withCredentials: true });
  }

  approveStudent(id: number) {
    return this.httpClient.post(`${this.baseUrl}/approveUser/${id}`, {});
  }

  deleteStudent(id: number) {
    return this.httpClient.delete(
      `${this.baseUrl}/delete/${id}`
    );
  }

  updateStudent(id: number, student: Partial<Student>) {
    return this.httpClient.put(
      `${this.baseUrl}/${id}`, student
    );
  }
}
