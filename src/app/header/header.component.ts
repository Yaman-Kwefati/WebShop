import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener, Inject,
  OnInit, Renderer2,
  ViewChild
} from '@angular/core';
import {CommonModule, DOCUMENT, NgOptimizedImage} from '@angular/common';
import {AppModule} from "../app.module";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {SearchResultsComponent} from "./searchbar/search-results/search-results.component";
import {SearchbarComponent} from "./searchbar/searchbar.component";
import {Event, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Product} from "../models/Product.model";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../services/user.service";
import { gsap, Power2, Expo } from 'gsap';
import {AuthService} from "../services/auth.service";
import {ProductService} from "../services/product.service";
import {Platform} from "@angular/cdk/platform";
import {WINDOW} from "../../environment /environment";

gsap.registerPlugin()

@Component({
  selector: 'app-header',
  imports: [CommonModule,
    NgOptimizedImage,
    AppModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    ShoppingCartComponent,
    SearchResultsComponent,
    SearchbarComponent,
    RouterLink,
    RouterLinkActive],
  providers: [UserService, AuthService,],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  host: {ngSkipHydration: 'true'},
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
  @ViewChild('header') header!: ElementRef<HTMLElement>;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;

    if (scrollPosition > 10) {
      this.header.nativeElement.classList.add('blurred-header');
    } else {
      this.header.nativeElement.classList.remove('blurred-header');
    }
  }

  constructor(private cartService: ShoppingCartService,
              private cdr: ChangeDetectorRef,
              private cookieService: CookieService,
              private router: Router,
              private userService: UserService,
              private auth: AuthService,
              @Inject(DOCUMENT) private document: Document,
              @Inject(WINDOW) private window: Window,
              private platform: Platform) {
  }

  ngOnInit(): void {
    if (this.platform.isBrowser) this.initializeMenuAnimations();
    let userId = this.getLoggedInUserId();
    if (userId && this.platform.isBrowser){
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
    if (userId && this.platform.isBrowser){
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
  // openMenuAnimation(): void {
  //   gsap.fromTo(this.mobileNav.nativeElement,
  //     { height: 0, opacity: 0 },
  //     {
  //       height: 'auto', opacity: 1, duration: 0.5, ease: "power2.out",
  //       onComplete: () => {
  //         this.mobileNav.nativeElement.style.height = 'auto';
  //       }
  //     }
  //   );
  //
  //   gsap.fromTo(this.mobileNavTop.nativeElement.childNodes,
  //     { opacity: 0, y: -20 },
  //     { opacity: 1, y: 0, stagger: 0.1, delay: 0.1, duration: 0.3 });
  //
  //   gsap.fromTo(this.mobileNavBottom.nativeElement,
  //     { opacity: 0, y: -20 },
  //     { opacity: 1, y: 0, stagger: 0.1, delay: 0.1, duration: 0.3 });
  // }
  //
  // closeMenuAnimation(): void {
  //   gsap.to([this.mobileNavTop.nativeElement.childNodes, this.mobileNavBottom.nativeElement], {
  //     opacity: 0, y: -20, stagger: 0.1, duration: 0.3
  //   });
  //
  //   gsap.to(this.mobileNav.nativeElement, {
  //     height: 0, opacity: 0, duration: 0.5, ease: "power2.in",
  //     onComplete: () => {
  //       this.isProfileMenuOpen = false;
  //     }
  //   });
  // }

  // toggleMenu() {
  //   this.isProfileMenuOpen = !this.isProfileMenuOpen;
  //   if (this.isProfileMenuOpen) {
  //     this.openMenuAnimation();
  //   } else {
  //     this.closeMenuAnimation();
  //   }
  // }
  initializeMenuAnimations() {
    const menuToggle = this.document.getElementById('menuToggle') as HTMLButtonElement | null;

    if (!menuToggle) {
      console.error('Menu toggle button not found');
      return;
    }

    const menuBar = gsap.timeline({ paused: true });

    menuBar.to('.bar-1', 0.5, {
      attr: { d: 'M8,2 L2,8' },
      x: 1,
      ease: Power2.easeInOut
    }, 'start')
      .to('.bar-2', 0.5, {
        autoAlpha: 0
      }, 'start')
      .to('.bar-3', 0.5, {
        attr: { d: 'M8,8 L2,2' },
        x: 1,
        ease: Power2.easeInOut
      }, 'start')
      .reverse();

    const navTl = gsap.timeline({ paused: true });

    navTl.to('.fullpage-menu', {
      duration: 0,
      display: 'block',
      ease: Expo.easeInOut
    }, '<')
      .to('.menu-bg', {
        duration: 1,
        opacity: 1,
        ease: Expo.easeInOut
      }, '<')
      .from('.main-menu li a', {
        duration: 1.5,
        y: '100%',
        rotateY: 30,
        stagger: 0.2,
        ease: Expo.easeInOut
      }, '-=0.5')
      .reverse();

    menuToggle.addEventListener('click', () => {
      menuBar.reversed(!menuBar.reversed());
      navTl.reversed(!navTl.reversed());
    });
    this.document.querySelectorAll('.main-menu li a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu(menuBar, navTl));
    });
  }
  closeMenu(menuBar: gsap.core.Timeline, navTl: gsap.core.Timeline) {
    if (!menuBar.reversed()) {
      menuBar.reverse();
    }

    if (!navTl.reversed()) {
      navTl.reverse();
    }
  }


}
