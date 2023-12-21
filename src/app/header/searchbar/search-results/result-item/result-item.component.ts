import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product} from "../../../../models/Product.model";

@Component({
  selector: 'app-result-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-item.component.html',
  styleUrl: './result-item.component.less'
})
export class ResultItemComponent {
  @Input() product!: Product;
}
