import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {AppModule} from "./app.module";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {HttpClientModule} from "@angular/common/http";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, AppModule, LandingPageComponent,
  HttpClientModule, FontAwesomeModule, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent{
  // @ViewChild('HeadSection', {static: true}) HeadSection!: ElementRef<HTMLDivElement>;
  // @ViewChild('ProductsSection', {static: true}) ProductsSection!: ElementRef<HTMLDivElement>;
  // @ViewChild('ProductsDetailsSection', {static: true}) ProductsDetailsSection!: ElementRef<HTMLDivElement>;
  // @ViewChild('aboutUsSection', {static: true}) aboutUsSection!: ElementRef<HTMLDivElement>;
  //
  // constructor(@Inject(DOCUMENT) private document: Document) {
  // }
  //
  // ngOnInit(): void {
  //   this.initScrollAnimations();
  //   this.initialAnimations();
  // }
  //
  // initScrollAnimations(): void{
  //   gsap.to()
  // }
  //
  // initialAnimations(): void{
  //   gsap.from(this.HeadSection.nativeElement.childNodes, {
  //     duration: 0.5,
  //     opacity: 0,
  //     y: -20,
  //     stagger: 0.2,
  //     delay: 0.5,
  //   });
  // }
}

