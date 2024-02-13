import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environment /environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // private readonly checkoutEndpoint = 'http://localhost:8080/create-checkout-session';
  private readonly checkoutEndpoint = environment.serverApiRoute+"/payment/create-checkout-session";

  constructor(private http: HttpClient) { }

  createCheckoutSession(paymentRequest: any): Observable<any> {
    return this.http.post(this.checkoutEndpoint, paymentRequest);
  }
}
