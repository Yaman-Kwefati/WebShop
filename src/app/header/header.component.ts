import {Component, HostListener} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AppModule} from "../app.module";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ShoppingCartModalComponent} from "./shopping-cart/shopping-cart-modal/shopping-cart-modal.component";
import {SearchResultsComponent} from "./searchbar/search-results/search-results.component";
import {SearchbarComponent} from "./searchbar/searchbar.component";
import {CategoriesComponent} from "./categories/categories.component";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [CommonModule, NgOptimizedImage, AppModule, MatButtonModule, MatMenuModule, MatIconModule, MatBadgeModule, ShoppingCartComponent, ShoppingCartModalComponent, SearchResultsComponent, SearchbarComponent, CategoriesComponent, RouterLink],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  isProfileMenuOpen = false;
  isShoppingCartOpen = false;
  openSearchResultsModal = false;
  isSearchBarExpanded = false;
  isCategoriesOpen = false;

  expandSearchBar() {
    this.isSearchBarExpanded = !this.isSearchBarExpanded;
  }

  openSearchResults(){
    this.openSearchResultsModal = !this.openSearchResultsModal;
  }

  openCatrgoriesModal(){
    this.isCategoriesOpen = !this.isCategoriesOpen;
  }
}
