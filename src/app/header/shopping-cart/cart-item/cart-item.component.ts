import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product} from "../../../models/Product.model";
import {CartProduct, ShoppingCartService} from "../../../services/shopping-cart.service";
import {RouterLink} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {FileService} from "../../../services/File.service";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [FileService],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.less'
})
export class CartItemComponent implements OnInit{
  @Input() product!: CartProduct;
  fileURL: SafeUrl = '';

  constructor(private cartService: ShoppingCartService,
              private sanitizer: DomSanitizer,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    if (this.product){
      this.loadFile(this.product.product.images[0]);
    }
  }

  loadFile(filename: string) {
    this.fileService.fetchFile(filename).subscribe(
      blob => {
        const objectUrl = URL.createObjectURL(blob);
        this.fileURL = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      },
      error => {
        console.error('Error loading image', error);
      }
    );
  }

  removeCartItem(product: CartProduct) {
    let index = this.cartService.getCartItems().indexOf(product);
    this.cartService.removeFromCart(index);
  }
}
