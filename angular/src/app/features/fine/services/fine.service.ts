import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinePaymentResponse, FineResponse, FineSummary } from '../models/fine.model';
import { Observable } from 'rxjs';
import { AdminFine } from '../../user/models/adminFine.model';

@Injectable({
  providedIn: 'root'
})
export class FineService {
  private baseUrl =
    'http://localhost:8080/fine';

  constructor(private http: HttpClient) { }

  getMyFines():
    Observable<FineResponse> {
    console.log("get my fines called");
    return this.http.get<FineResponse>(
      `${this.baseUrl}/myFine`
    );
  }

  getSummary():Observable<FineSummary> {
    return this.http.get<FineSummary>(
      `${this.baseUrl}/summary`
    );
  }

  payFine(amount: number):Observable<FinePaymentResponse> {
    return this.http.post<FinePaymentResponse>(
      `${this.baseUrl}/pay`,
      { amount }
    );
  }

  getAllStudentFines() {
    return this.http.get<AdminFine[]>(
      `${this.baseUrl}/all`
    );
  }
}
