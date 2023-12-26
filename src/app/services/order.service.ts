import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ShopOrder} from "../models/ShopOrder.model";
import {CookieService} from "ngx-cookie-service";
import {CartProduct} from "./shopping-cart.service";
import {OrderItem} from "../models/OrderItem.model";

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
  private baseUrl: string = "/api/v1/";
  constructor(private http: HttpClient,
              private cookieService: CookieService){}

  fetchOrders(){
    return this.http.get<ApiResponse<ShopOrder[]>>(this.baseUrl+"orders/all-orders");
  }

  makeOrder(total: number, cartItems: CartProduct[]){
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
    return this.http.post<ApiResponse<ShopOrder>>(this.baseUrl + "orders/new-order", orderData).subscribe(
      responseData => {
        let order = responseData.payload;
        if (order){
          for (var cartItem of cartItems){
            this.placeNewOrderItem(order, cartItem.product.id!, cartItem.quantity, cartItem.totalPrice).subscribe(
              response => {
                console.log(response);
              }
            );
          }
        }
      }
    );
  }

  placeNewOrderItem(shopOrderId: ShopOrder, productId: number, quantity: number, subtotal: number){
    return this.http.post<ApiResponse<OrderItem>>(this.baseUrl + "order-items/new-order-item", {
      shopOrderId: shopOrderId,
      productId: productId,
      quantity: quantity,
      subtotal: subtotal,
    })
  }

  getOrderItemsFromOrder(orderId: number){
    return this.http.get<ApiResponse<OrderItem[]>>(this.baseUrl + "order-items/by-order/" + orderId);
  }

  updateOrderStatus(orderId: number, orderStatus: string){
    return this.http.put<ApiResponse<ShopOrder>>(this.baseUrl + "orders/" + orderId, {
      orderId: orderId,
      userId: {},
      orderStatus: orderStatus,
      orderDate: "",
      totalAmount: "",
    }).subscribe();
  }
}
