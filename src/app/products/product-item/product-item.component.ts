import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product} from "../../models/Product.model";
import {RouterLink} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {CartProduct, ShoppingCartService} from "../../services/shopping-cart.service";
import {FileService} from "../../services/File.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [ProductService, FileService],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.less'
})
export class ProductItemComponent implements OnInit{
  @Input() product!: Product;
  onHover = false;
  fileURL: SafeUrl = '';

  constructor(private sanitizer: DomSanitizer,
              private cartService: ShoppingCartService,
              private fileService: FileService) {
  }

  addToShoppingCart(product: Product) {
    let cartProduct: CartProduct = { product: product, quantity: 1, totalPrice: product.price };
    this.cartService.addToCart(cartProduct);
  }

  ngOnInit(): void {
    if (this.product.images){
      this.loadFile(this.product.images[0]);
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

}
