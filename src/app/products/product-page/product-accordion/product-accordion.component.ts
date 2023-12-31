import {Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccordionModule} from "primeng/accordion";

@Component({
  selector: 'app-product-accordion',
  standalone: true,
  imports: [CommonModule, AccordionModule,],
  templateUrl: './product-accordion.component.html',
  styleUrl: './product-accordion.component.less'
})
export class ProductAccordionComponent {
}
