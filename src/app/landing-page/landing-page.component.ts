import {
  afterRender,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {CartItemComponent} from "../header/shopping-cart/cart-item/cart-item.component";
import {MatListModule} from "@angular/material/list";
import {AboutUsComponent} from "./about-us/about-us.component";
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from "@angular/router";
import {filter} from "rxjs";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {provideAnimations} from "@angular/platform-browser/animations";
import {OurSkillsComponent} from "../shared/our-skills/our-skills.component";
import {Platform} from "@angular/cdk/platform";
import {platform} from "node:os";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, CartItemComponent, MatListModule, AboutUsComponent, RouterLink, OurSkillsComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.less',
  providers: [provideAnimations()]
})
export class LandingPageComponent implements AfterViewInit, OnInit{
  @ViewChild('aboutUsSection') aboutUsSection!: ElementRef;
  onHover = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              @Inject(DOCUMENT) private document: Document,
              private platform: Platform) {}

  ngAfterViewInit(): void {
    if (this.platform.isBrowser){
      this.initScrollAnimations();
      this.initialAnimations();
      this.imageAnimation();
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
  }

  navigateToProducts() {
    this.router.navigate(['products']);
  }

  //animations

  @ViewChild('HeadSection', {static: true}) HeadSection!: ElementRef<HTMLDivElement>;
  @ViewChild('Image', {static: true}) image!: ElementRef<HTMLDivElement>;
  @ViewChild('FisrtImage', {static: true}) FisrtImage!: ElementRef<HTMLDivElement>;
  @ViewChild('ProductsSection', {static: true}) ProductsSection!: ElementRef<HTMLDivElement>;
  @ViewChild('ProductsDetailsSection', {static: true}) ProductsDetailsSection!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
  }

  imageAnimation(){
    gsap.fromTo(this.image.nativeElement,
      { scale: 1.2},
      {scale: 1, duration: 0.9});
  }

  initScrollAnimations(): void{
    gsap.from(this.ProductsSection.nativeElement, {
      scrollTrigger: {
        trigger: ".box",
        start: 'top bottom-=100', // Adjust this value as needed
        toggleActions: 'play none none none'
      },
      stagger: 1,
      duration: 0.8,
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
