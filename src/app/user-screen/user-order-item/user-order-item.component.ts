import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShopOrder} from "../../models/ShopOrder.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-order-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-order-item.component.html',
  styleUrl: './user-order-item.component.less'
})
export class UserOrderItemComponent {
  @Input() order!: ShopOrder;

  constructor(private router: Router) {
  }

  openOrder(number: number) {
    this.router.navigate(
      ['order-details'],
      {queryParams: {order:number}}
    );
  }
}
