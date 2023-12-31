import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit, Renderer2,
  ViewChild
} from '@angular/core';
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
import {Event, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Product} from "../models/Product.model";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../services/user.service";
import {gsap} from "gsap";
import {AuthService} from "../services/auth.service";

gsap.registerPlugin()

@Component({
  selector: 'app-header',
  imports: [CommonModule, NgOptimizedImage, AppModule, MatButtonModule, MatMenuModule, MatIconModule, MatBadgeModule, ShoppingCartComponent, SearchResultsComponent, SearchbarComponent, CategoriesComponent, RouterLink, RouterLinkActive],
  providers: [UserService, AuthService],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent implements AfterViewChecked, OnInit{
  @ViewChild('searchbarComponent') searchbarComponent!: SearchbarComponent;
  isProfileMenuOpen = false;
  openSearchResultsModal = false;
  isSearchBarExpanded = false;
  isCategoriesOpen = false;
  cartBadgeNumber !: number | null;
  productsResults: Product[] = [];
  userName = "";
  userEmail = "";
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event){
    this.productsResults = [];
  }

  constructor(private cartService: ShoppingCartService,
              private cdr: ChangeDetectorRef,
              private cookieService: CookieService,
              private router: Router,
              private userService: UserService,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    let userId = this.getLoggedInUserId();
    if (userId){
      this.userService.fetchUser(userId).subscribe(
        response => {
          this.userName = response.payload.firstname + " " + response.payload.lastname;
          this.userEmail = response.payload.email;
        }
      )
    }
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
      this.cdr.detectChanges();
    } else {
      this.cartBadgeNumber = null;
      this.cdr.detectChanges();
    }
  }

  navigateToUserPanel(){
    let userId = this.getLoggedInUserId();
    if (userId){
      this.userService.fetchUser(userId).subscribe(
        response => {
          let user = response.payload;
          this.userName = user.firstname + " " + user.lastname;
          this.userEmail = user.email;
          if (user.userRole != null && user.userRole == 'CUSTOMER'){
            this.router.navigate(['user']);
          }
          else if (user.userRole != null && user.userRole == 'ADMIN'){
            this.router.navigate(['admin']);
          }
        }
      )
    }
    else {
      this.router.navigate(['login']);
    }
  }

  clearCookies(){
    if (this.getLoggedInUserId()){
      this.auth.logout().subscribe(
        () => {
          this.router.navigate(['/']);
        }
      );
      this.cookieService.deleteAll();
      this.router.navigate(['/']);
    }
  }

  getLoggedInUserId(){
    return this.cookieService.get('userId');
  }

  //animation
  @ViewChild('MobileNav', {static: true}) mobileNav!: ElementRef<HTMLDivElement>;
  @ViewChild('MobileNavTop', {static: true}) mobileNavTop!: ElementRef<HTMLDivElement>;
  @ViewChild('MobileNavBottom', {static: true}) mobileNavBottom!: ElementRef<HTMLDivElement>;
  openMenuAnimation(): void {
    gsap.fromTo(this.mobileNav.nativeElement,
      { height: 0, opacity: 0 },
      {
        height: 'auto', opacity: 1, duration: 0.5, ease: "power2.out",
        onComplete: () => {
          this.mobileNav.nativeElement.style.height = 'auto';
        }
      }
    );

    gsap.fromTo(this.mobileNavTop.nativeElement.childNodes,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, stagger: 0.1, delay: 0.1, duration: 0.3 });

    gsap.fromTo(this.mobileNavBottom.nativeElement,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, stagger: 0.1, delay: 0.1, duration: 0.3 });
  }

  closeMenuAnimation(): void {
    gsap.to([this.mobileNavTop.nativeElement.childNodes, this.mobileNavBottom.nativeElement], {
      opacity: 0, y: -20, stagger: 0.1, duration: 0.3
    });

    gsap.to(this.mobileNav.nativeElement, {
      height: 0, opacity: 0, duration: 0.5, ease: "power2.in",
      onComplete: () => {
        this.isProfileMenuOpen = false;
      }
    });
  }

  toggleMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    if (this.isProfileMenuOpen) {
      this.openMenuAnimation();
    } else {
      this.closeMenuAnimation();
    }
  }
}
