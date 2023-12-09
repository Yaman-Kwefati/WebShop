import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartItemComponent} from "../header/shopping-cart/cart-item/cart-item.component";
import {MatListModule} from "@angular/material/list";
import {AboutUsComponent} from "./about-us/about-us.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, CartItemComponent, MatListModule, AboutUsComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.less'
})
export class LandingPageComponent {
  onHover = false;
}
