import {Injectable} from '@angular/core';
import { Product } from '../models/Product.model';
import {CookieService} from "ngx-cookie-service";

export interface CartProduct {
  product: Product,
  quantity: number,
  totalPrice: number;
}
@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService{
  private cartItems: CartProduct[] = [];
  private total = 0;

  constructor(private cookieService: CookieService) {
    this.loadItemsFromCookie();
  }


  getCartItems() {
    return this.cartItems;
  }

  loadItemsFromCookie(){
    const storedCartItems = this.cookieService.get('cartItems');
    console.log(storedCartItems);
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      // Calculate totalPrice and quantity for each item when reading from the cookie
      this.cartItems.forEach(item => {
        item.totalPrice = item.product.price * item.quantity;
      });
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  getTotal(){
    return this.total;
  }

  addToCart(product: CartProduct) {
    const existingProductIndex = this.cartItems.findIndex(item => item.product.name === product.product.name);

    if (existingProductIndex !== -1) {
      // If the product already exists in the cart, update its quantity and total price
      this.cartItems[existingProductIndex].quantity += 1;
      this.cartItems[existingProductIndex].totalPrice +=
        this.cartItems[existingProductIndex].product.price;
    } else {
      // If the product is not in the cart, add it with an initial quantity of 1 and totalPrice
      product.quantity = 1;
      product.totalPrice = product.product.price; // Initialize totalPrice based on the product's price
      this.cartItems.push(product);
    }

    this.updateCartCookie(); // Save the updated cart to the cookie
    this.calculateTotal();
  }


  private updateCartCookie(){
    this.cookieService.set('cartItems', JSON.stringify(this.cartItems));
  }

  removeFromCart(index: number) {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      this.updateCartCookie();
      this.calculateTotal();
    }
  }

  clearCart() {
    this.cartItems = [];
    this.updateCartCookie();
    return this.cartItems;
  }

  getCartItemsCount(){
    let count = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      count += this.cartItems[i].quantity;
    }
    return count;
  }
}
