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
    console.log("I am calling get all students api");
    return this.httpClient.get<Student[]>(this.baseUrl, { withCredentials: true });
  }

  approveStudent(id: number) {
    console.log("id form approve student : " + id)
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
