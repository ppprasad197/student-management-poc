import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinePaymentResponse, FineResponse, FineSummary } from '../models/fine.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FineService {
  private baseUrl =
    'http://localhost:8080/fine';

  constructor(
    private http: HttpClient
  ) { }

  getMyFines():
    Observable<FineResponse> {
    console.log("get my fines called");
    return this.http.get<FineResponse>(
      `${this.baseUrl}/myFine`
    );
  }

  getSummary():
    Observable<FineSummary> {

    return this.http.get<FineSummary>(
      `${this.baseUrl}/summary`
    );
  }

  payFine(amount: number):
    Observable<FinePaymentResponse> {

    console.log("pay fine called and total fine is : " + amount);

    return this.http.post<FinePaymentResponse>(

      `${this.baseUrl}/pay`,

      { amount }

    );
  }
}
