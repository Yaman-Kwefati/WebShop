import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
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
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-header',
  imports: [CommonModule, NgOptimizedImage, AppModule, MatButtonModule, MatMenuModule, MatIconModule, MatBadgeModule, ShoppingCartComponent, SearchResultsComponent, SearchbarComponent, CategoriesComponent, RouterLink],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent implements AfterViewChecked{
  @ViewChild('searchbarComponent') searchbarComponent!: SearchbarComponent;
  isProfileMenuOpen = false;
  openSearchResultsModal = false;
  isSearchBarExpanded = false;
  isCategoriesOpen = false;
  cartBadgeNumber !: number | null;
  productsResults: Product[] = [];
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event){
    this.productsResults = [];
  }

  constructor(private cartService: ShoppingCartService,
              private cdr: ChangeDetectorRef,
              private cookieService: CookieService,
              private router: Router) {
  }

  expandSearchBar() {
    this.isSearchBarExpanded = !this.isSearchBarExpanded;
  }

  openSearchResults(){
    this.openSearchResultsModal = !this.openSearchResultsModal;
  }

  openCategoriesModal(){
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

  navigateToUserPanel(){
    let role = this.getLoggedInUserRole();
    if (role != null && role == 'CUSTOMER'){
      this.router.navigate(['user']);
    }
    else if (role != null && role == 'ADMIN'){
      this.router.navigate(['admin']);
    }
    else {
      this.router.navigate(['login']);
    }
  }

  clearCookies(){
    if (this.getLoggedInUserRole()){
      this.cookieService.deleteAll();
      this.router.navigate(['/']);
    }
  }

  getLoggedInUserRole(){
    return this.cookieService.get('userRole');
  }
}
