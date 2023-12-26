import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartItemComponent} from "./cart-item/cart-item.component";
import {CartProduct, ShoppingCartService} from "../../services/shopping-cart.service";
import {RouterLink} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, RouterLink],
  providers: [OrderService],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.less'
})
export class ShoppingCartComponent implements OnInit, AfterViewChecked {
  cartItems: CartProduct[] = this.cartService.getCartItems();
  total!: number;

  constructor(private cartService: ShoppingCartService,
              private cdr: ChangeDetectorRef,
              private orderService: OrderService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.total = this.cartService.getTotal();
    this.cdr.detectChanges();
  }

  placeOrder() {
    // let user = new User(
    //   +this.cookieService.get('userId'),
    //   this.cookieService.get('firstname'),
    //   this.cookieService.get('lastname'),
    //   this.cookieService.get('email'),
    //   this.cookieService.get('phoneNumber'),
    //   this.cookieService.get('city'),
    //   this.cookieService.get('street'),
    //   this.cookieService.get('postalCode'),
    //   this.cookieService.get('userRole'),
    // );
    // if (user != null){
    //   let order = new ShopOrder(user, this.total);
    //   console.log(user);
    //
    // }
    if (this.cookieService.get('userId') && this.cartItems){
      this.orderService.makeOrder(this.total, this.cartItems);
    }
  }
}
