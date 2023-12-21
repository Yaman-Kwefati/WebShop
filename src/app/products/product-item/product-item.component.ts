import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product} from "../../models/Product.model";
import {RouterLink} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {CartProduct, ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [ProductService],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.less'
})
export class ProductItemComponent {
  @Input() product!: Product;
  onHover = false;

  constructor(private cartService: ShoppingCartService) {
  }

  addToShoppingCart(product: Product) {
    let cartProduct: CartProduct = { product: product, quantity: 1, totalPrice: product.price };
    this.cartService.addToCart(cartProduct);
  }


}
