import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl="https://localhost:44373/api/creditCards/check";
  constructor(private httpClient:HttpClient) { }
  check(creditCard:Object): Observable<Boolean> {
    return this.httpClient.post<boolean>(this.apiUrl);
  }
}
