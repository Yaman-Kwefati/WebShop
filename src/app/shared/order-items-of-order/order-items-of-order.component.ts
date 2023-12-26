import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Params} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {OrderItem} from "../../models/OrderItem.model";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-order-items-of-order',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  providers: [OrderService],
  templateUrl: './order-items-of-order.component.html',
  styleUrl: './order-items-of-order.component.less'
})
export class OrderItemsOfOrderComponent implements OnInit{
  displayedColumns: string[] = ['orderItemId', 'productId', 'quantity', 'subtotal'];
  orderItems: OrderItem[] = [];
  orderId!: number;
  constructor(private route: ActivatedRoute,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.orderId = +params['orderId'];
      }
    );
    if (this.orderId){
      this.orderService.getOrderItemsFromOrder(this.orderId).subscribe(
        responseData => {
          this.orderItems = responseData.payload;
          console.log(this.orderItems);
        }
      );
    };
  }
}
