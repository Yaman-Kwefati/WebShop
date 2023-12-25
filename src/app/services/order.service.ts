import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ShopOrder} from "../models/ShopOrder.model";
import {CookieService} from "ngx-cookie-service";

export interface ApiResponse<T> {
  code: string;
  payload: T;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService{
  orders!: ShopOrder[];
  private baseUrl: string = "http://localhost:8080/api/v1/";
  constructor(private http: HttpClient,
              private cookieService: CookieService){}

  fetchOrders(){
    return this.http.get<ApiResponse<ShopOrder[]>>(this.baseUrl+"orders/all-orders");
  }

  makeOrder(total: number){
    const orderData = {
      userId: {
        id: +this.cookieService.get('userId'),
        firstname: this.cookieService.get('firstname'),
        lastname: this.cookieService.get('lastname'),
        email: this.cookieService.get('email'),
        phoneNumber: this.cookieService.get('phoneNumber'),
        city: this.cookieService.get('city'),
        street: this.cookieService.get('street'),
        postalCode: this.cookieService.get('postalCode'),
        userRole: this.cookieService.get('userRole'),
      },
      orderStatus: 'PLACED',
      orderDate: "2023-12-25",
      totalAmount: total
    };
    return this.http.post<ApiResponse<ShopOrder[]>>(this.baseUrl + "orders/new-order", orderData).subscribe();
  }
}
