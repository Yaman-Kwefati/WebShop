import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product} from "../../../models/Product.model";
import {CartProduct, ShoppingCartService} from "../../../services/shopping-cart.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.less'
})
export class CartItemComponent {
  @Input() product!: CartProduct;

  constructor(private cartService: ShoppingCartService) {
  }

  removeCartItem(product: CartProduct) {
    let index = this.cartService.getCartItems().indexOf(product);
    this.cartService.removeFromCart(index);
  }
}
