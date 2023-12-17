import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {ProductItemComponent} from "./product-item/product-item.component";
import {ProductService} from "../services/product.service";
import {Product} from "../models/Product.model";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  providers: [ProductService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.less'
})
export class ProductsComponent implements OnInit{
  products!: Product[];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe(
        products => {
          this.products = products.payload;
        }
    );
  }

}
