import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { StudentPageResponse } from '../models/StudentPageResponse';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = "http://localhost:8080/user";
  constructor(private httpClient: HttpClient) { }


  getStudents(page: number, size: number): Observable<StudentPageResponse> {
    return this.httpClient.get<StudentPageResponse>(
      `${this.baseUrl}/students?page=${page}&size=${size}`,
      { withCredentials: true }
    );
  }

  approveStudent(id: number) {
    return this.httpClient.post(
      `${this.baseUrl}/approveUser/${id}`,
      {},
      {
        withCredentials: true,
        responseType: 'text'
      }
    );
  }

  deleteStudent(id: number) {
    return this.httpClient.delete(
      `${this.baseUrl}/delete/${id}`,
      {
        withCredentials: true,
        responseType: 'text'
      }
    );
  }

  updateStudent(id: number, student: Partial<Student>) {
    return this.httpClient.put(
      `${this.baseUrl}/${id}`, student
    );
  }
}
