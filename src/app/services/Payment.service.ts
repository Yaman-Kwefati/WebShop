import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // private readonly checkoutEndpoint = 'http://localhost:8080/create-checkout-session';
  private readonly checkoutEndpoint = '/api/v1/payment/create-checkout-session';

  constructor(private http: HttpClient) { }

  createCheckoutSession(paymentRequest: any): Observable<any> {
    return this.http.post(this.checkoutEndpoint, paymentRequest);
  }
}
