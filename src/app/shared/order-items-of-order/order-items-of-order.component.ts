import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Params} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {OrderItem} from "../../models/OrderItem.model";
import {MatTableModule} from "@angular/material/table";
import {UserService} from "../../services/user.service";
import {User} from "../../models/User.model";

@Component({
  selector: 'app-order-items-of-order',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  providers: [OrderService],
  templateUrl: './order-items-of-order.component.html',
  styleUrl: './order-items-of-order.component.less',
  host: {ngSkipHydration: 'true'},
})
export class OrderItemsOfOrderComponent implements OnInit{
  displayedColumns: string[] = ['orderItemId', 'productId', 'quantity', 'subtotal'];
  orderItems: OrderItem[] = [];
  orderId!: number;
  user!: User;
  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.orderId = +params['orderId'];
        this.userService.fetchUser(params['orderUser']).subscribe(
          res => {
            this.user = res.payload;
          }
        );
      }
    );
    if (this.orderId){
      this.orderService.getOrderItemsFromOrder(this.orderId).subscribe(
        responseData => {
          this.orderItems = responseData.payload;
        }
      );
    };
  }
}
