import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderItem} from "../../models/OrderItem.model";
import {Product} from "../../models/Product.model";
import {OrderService} from "../../services/order.service";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FileService} from "../../services/File.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {UserOrderDetailsProductComponent} from "./user-order-details-product/user-order-details-product.component";

@Component({
  selector: 'app-user-order-details',
  standalone: true,
  imports: [CommonModule, RouterLink, UserOrderDetailsProductComponent],
  providers: [OrderService, ProductService, FileService],
  templateUrl: './user-order-details.component.html',
  styleUrl: './user-order-details.component.less'
})
export class UserOrderDetailsComponent implements OnInit{
  orderId!: number;
  orderItems: OrderItem[] = [];
  products: Product[] = [];

  constructor(private orderService: OrderService,
              private productService: ProductService,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.orderId = +params['order'];
        if (this.orderId) this.getOrderItems();
      }
    )
  }

  getProductForOrderItem(orderItem: OrderItem): Product | undefined {
    return this.products.find(p => p.id === orderItem.productId);
  }

  getOrderItems(){
    if (!this.orderId) return;
    this.orderService.getOrderItemsFromOrder(this.orderId).subscribe(
      responseData => {
        this.orderItems = responseData.payload;
        for (let orderItem of this.orderItems){
          this.productService.fetchProductById(orderItem.productId).subscribe(
            response => {
              this.products.push(response.payload);
            }
          )
        }
      }
    );
  }

}
