import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {CookieService} from "ngx-cookie-service";
import {OrderService} from "../../services/order.service";
import {gsap} from "gsap";

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  providers: [OrderService],
  templateUrl: './success.component.html',
  styleUrl: './success.component.less'
})
export class SuccessComponent implements OnInit{
  constructor(private shoppingCartService: ShoppingCartService,
              private cookieService: CookieService,
              private orderService: OrderService,
              private cartService: ShoppingCartService) {
  }
  ngOnInit(): void {
    this.placeOrder();
    gsap.from(".text-center", { duration: 1, y: -100, opacity: 0 });
  }

  placeOrder(){
    const userId = this.cookieService.get('userId');
    const cartItems = this.shoppingCartService.getCartItems();
    const total = this.cartService.getTotal();
    if (userId && cartItems){
      this.orderService.makeOrder(total, cartItems);
      this.cookieService.delete('cartItems');
    };
  }

}
