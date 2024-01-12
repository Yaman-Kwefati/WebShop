import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartItemComponent} from "./cart-item/cart-item.component";
import {CartProduct, ShoppingCartService} from "../../services/shopping-cart.service";
import {Router, RouterLink} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {CookieService} from "ngx-cookie-service";
import {PaymentService} from "../../services/Payment.service";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, RouterLink],
  providers: [OrderService, PaymentService, UserService],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.less'
})
export class ShoppingCartComponent implements OnInit, AfterViewChecked {
  cartItems: CartProduct[] = this.cartService.getCartItems();
  total!: number;

  constructor(private cartService: ShoppingCartService,
              private cdr: ChangeDetectorRef,
              private cookieService: CookieService,
              private paymentService: PaymentService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.total = this.cartService.getTotal();
    this.cdr.detectChanges();
  }

  startPaymentProcess() {
    let userEmail = "";
    this.userService.fetchUser(this.cookieService.get('userId')).subscribe(
      response => {
        userEmail = response.payload.email;
      }
    )

    // Map cart items to a format suitable for the payment request
    const items = this.cartItems.map(item => ({
      productName: item.product.name,
      quantity: item.quantity,
      price: item.product.price * 100, // Assuming price is in dollars and needs conversion to cents
      userEmail: userEmail,
      productId: item.product.id
    }));

    const paymentRequest = {
      items: items,
      userEmail: userEmail
    };

    this.paymentService.createCheckoutSession(paymentRequest).subscribe({
      next: (response) => {
        if (response && response.message) {
          // Redirect the user to the Stripe Checkout page
          window.location.href = response.message;
          console.log(response.message)
        } else {
          console.error('Checkout URL is undefined or invalid');
        }
      },
      error: (err) => {
        console.error('Error creating checkout session', err);
      }
    });

  }

  onCheckOut(){
    let userId = this.cookieService.get('userId');
    if (userId){
      this.startPaymentProcess();
    } else {
      this.router.navigate(['/login']);
    }
  }
}
