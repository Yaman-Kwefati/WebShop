import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/Product.model";

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ProductService],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.less'
})
export class SearchbarComponent {
  @ViewChild('search') searchbarComponent!: ElementRef;
  @Output() openSearchBar = new EventEmitter<boolean>();
  @Output() products = new EventEmitter<Product[]>();
  isSearchBarExpanded = false;
  isSearchBarEmpty = true;

  constructor(private productService: ProductService) {
  }

  expandSearchBar() {
    this.isSearchBarExpanded = !this.isSearchBarExpanded;
    this.openSearchBar.emit(this.isSearchBarExpanded);
  }

  filterProducts(event: string) {
    this.productService.fetchProducts().subscribe((products2) => {
      const filteredProducts = this.productService.filterProducts(event, products2.payload);
      this.products.emit(filteredProducts); // Emit the filtered products directly
    });
  }

  emptyInput() {
    this.isSearchBarEmpty = !this.isSearchBarEmpty;
    this.searchbarComponent.nativeElement.value = '';
  }
}
