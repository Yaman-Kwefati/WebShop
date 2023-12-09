import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartItemComponent} from "../cart-item/cart-item.component";
import {MatListModule} from "@angular/material/list";

@Component({
  selector: 'app-shopping-cart-modal',
  standalone: true,
  imports: [CommonModule, CartItemComponent, MatListModule],
  templateUrl: './shopping-cart-modal.component.html',
  styleUrl: './shopping-cart-modal.component.less'
})
export class ShoppingCartModalComponent {

}
