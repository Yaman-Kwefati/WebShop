import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {CartItemComponent} from "../header/shopping-cart/cart-item/cart-item.component";
import {MatListModule} from "@angular/material/list";
import {AboutUsComponent} from "./about-us/about-us.component";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import { Animate, initTE } from "tw-elements";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {CookieService} from "ngx-cookie-service";

gsap.registerPlugin(ScrollTrigger);
initTE({ Animate });

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, CartItemComponent, MatListModule, AboutUsComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.less',
})
export class LandingPageComponent implements AfterViewInit, OnInit{
  @ViewChild('aboutUsSection') aboutUsSection!: ElementRef;
  onHover = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              @Inject(DOCUMENT) private document: Document,
              private cookieSerive: CookieService) {}

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment === 'about-us' && this.aboutUsSection) {
        this.aboutUsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/home' || event.url === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }

  navigateToProducts() {
    this.router.navigate(['products']);
  }

  //animations

  @ViewChild('HeadSection', {static: true}) HeadSection!: ElementRef<HTMLDivElement>;
  @ViewChild('FisrtImage', {static: true}) FisrtImage!: ElementRef<HTMLDivElement>;
  @ViewChild('ProductsSection', {static: true}) ProductsSection!: ElementRef<HTMLDivElement>;
  @ViewChild('ProductsDetailsSection', {static: true}) ProductsDetailsSection!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.initScrollAnimations();
    this.initialAnimations();
  }

  initScrollAnimations(): void{
    gsap.from(this.ProductsSection.nativeElement, {
      scrollTrigger: ".box",
      duration: 1.0,
      y: 100,
      opacity: 0,
    });
    gsap.from(this.ProductsDetailsSection.nativeElement, {
      scrollTrigger: ".box",
      duration: 1.0,
      y: 100,
      opacity: 0,
    });
  }

  initialAnimations(): void{
    gsap.from(this.HeadSection.nativeElement.childNodes, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 0.5,
    });
  }
}
