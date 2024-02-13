import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ShopOrder} from "../models/ShopOrder.model";
import {CookieService} from "ngx-cookie-service";
import {CartProduct} from "./shopping-cart.service";
import {OrderItem} from "../models/OrderItem.model";
import {User} from "../models/User.model";
import {UserService} from "./user.service";
import {environment} from "../../environment /environment";

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
  // private baseUrl: string = "http://localhost:8080/api/v1";
  private baseUrl: string = environment.serverApiRoute;
  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private userService: UserService){}

  fetchOrders(){
    return this.http.get<ApiResponse<ShopOrder[]>>(this.baseUrl+"/orders/all-orders");
  }

  makeOrder(total: number, cartItems: CartProduct[]){
    let user!: User;
    this.userService.fetchUser(this.cookieService.get('userId')).subscribe(
      response => {
        user = response.payload;
        const orderData = {
          userId: {
            id: user.id,
            firstname:  user.firstname,
            lastname:  user.lastname,
            email:  user.email,
            phoneNumber:  user.phoneNumber,
            city:  user.city,
            street:  user.street,
            postalCode:  user.postalCode,
            userRole:  user.userRole,
          },
          orderStatus: 'PLACED',
          orderDate: "",
          totalAmount: total
        };
        return this.http.post<ApiResponse<ShopOrder>>(this.baseUrl + "/orders/new-order", orderData).subscribe(
          responseData => {
            let order = responseData.payload;
            if (order){
              for (var cartItem of cartItems){
                this.placeNewOrderItem(order, cartItem.product.id!, cartItem.quantity, cartItem.totalPrice).subscribe(
                  response => {
                  }
                );
              }
            }
          }
        );
      }
    );
  }

  placeNewOrderItem(shopOrderId: ShopOrder, productId: number, quantity: number, subtotal: number){
    return this.http.post<ApiResponse<OrderItem>>(this.baseUrl + "/order-items/new-order-item", {
      shopOrderId: shopOrderId,
      productId: productId,
      quantity: quantity,
      subtotal: subtotal,
    })
  }

  getOrderItemsFromOrder(orderId: number){
    return this.http.get<ApiResponse<OrderItem[]>>(this.baseUrl + "/order-items/by-order/" + orderId);
  }

  updateOrderStatus(orderId: number, orderStatus: string){
    return this.http.put<ApiResponse<ShopOrder>>(this.baseUrl + "/orders/" + orderId, {
      orderId: orderId,
      userId: {},
      orderStatus: orderStatus,
      orderDate: "",
      totalAmount: "",
    }).subscribe();
  }

  getUsersOrders(email: string){
    return this.http.get<ApiResponse<ShopOrder[]>>(this.baseUrl + "/orders/user/" + email);
  }
}
