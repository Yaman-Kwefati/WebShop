import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartItemComponent} from "./cart-item/cart-item.component";
import {CartProduct, ShoppingCartService} from "../../services/shopping-cart.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, RouterLink],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.less'
})
export class ShoppingCartComponent implements OnInit, AfterViewChecked {
  cartItems: CartProduct[] = this.cartService.getCartItems();
  total!: number;

  constructor(private cartService: ShoppingCartService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log(this.cartService.getCartItems());
    // this.total = this.cartService.getTotal();
  }

  ngAfterViewChecked(): void {
    this.total = this.cartService.getTotal();
    this.cdr.detectChanges(); // Manually trigger change detection
  }
}
