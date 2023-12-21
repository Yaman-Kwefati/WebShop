import {AfterViewChecked, ChangeDetectorRef, Component, HostListener} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AppModule} from "../app.module";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {SearchResultsComponent} from "./searchbar/search-results/search-results.component";
import {SearchbarComponent} from "./searchbar/searchbar.component";
import {CategoriesComponent} from "./categories/categories.component";
import {Router, RouterLink} from "@angular/router";
import {Product} from "../models/Product.model";
import {ShoppingCartService} from "../services/shopping-cart.service";

@Component({
  selector: 'app-header',
  imports: [CommonModule, NgOptimizedImage, AppModule, MatButtonModule, MatMenuModule, MatIconModule, MatBadgeModule, ShoppingCartComponent, SearchResultsComponent, SearchbarComponent, CategoriesComponent, RouterLink],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent implements AfterViewChecked{
  isProfileMenuOpen = false;
  openSearchResultsModal = false;
  isSearchBarExpanded = false;
  isCategoriesOpen = false;
  cartBadgeNumber !: number | null;

  constructor(private cartService: ShoppingCartService,
              private cdr: ChangeDetectorRef) {
  }

  expandSearchBar() {
    this.isSearchBarExpanded = !this.isSearchBarExpanded;
  }

  openSearchResults(){
    this.openSearchResultsModal = !this.openSearchResultsModal;
  }

  openCatrgoriesModal(){
    this.isCategoriesOpen = !this.isCategoriesOpen;
  }

  loadItems() {
    this.cartService.loadItemsFromCookie();
  }

  ngAfterViewChecked(): void {
    if (this.cartService.getCartItemsCount() > 0){
      this.cartBadgeNumber = this.cartService.getCartItemsCount();
    } else {
      this.cartBadgeNumber = null;
    }
    this.cdr.detectChanges();
  }
}
