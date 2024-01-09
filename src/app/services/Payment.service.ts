import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly checkoutEndpoint = 'https://430b-2a02-a445-1c3-0-e0ba-c652-bcfb-f09a.ngrok-free.app/create-checkout-session';
  // private readonly checkoutEndpoint = '/api/v1/payment/create-checkout-session';

  constructor(private http: HttpClient) { }

  createCheckoutSession(paymentRequest: any): Observable<any> {
    return this.http.post(this.checkoutEndpoint, paymentRequest);
  }
}
