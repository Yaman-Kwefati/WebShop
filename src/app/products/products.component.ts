import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductItemComponent} from "./product-item/product-item.component";
import {ProductService} from "../services/product.service";
import {Product} from "../models/Product.model";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  providers: [ProductService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.less',
  host: {ngSkipHydration: 'true'},
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
