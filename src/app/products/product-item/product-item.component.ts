import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product} from "../../models/Product.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.less'
})
export class ProductItemComponent {
  @Input() product!: Product;
  onHover = false;
}
