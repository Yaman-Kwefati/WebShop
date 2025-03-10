import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CookieService} from "ngx-cookie-service";
import {OrderService} from "../../services/order.service";
import {gsap} from "gsap";
import {ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  providers: [OrderService],
  templateUrl: './success.component.html',
  styleUrl: './success.component.less'
})
export class SuccessComponent implements OnInit{
  constructor(private cookieService: CookieService) {}
  ngOnInit(): void {
    this.clearCartItems();
    gsap.from(".text-center", { duration: 1, y: -100, opacity: 0 });
  }

  clearCartItems(){
    this.cookieService.delete('cartItems');
  }

}
