import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {AppModule} from "./app.module";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {HttpClientModule} from "@angular/common/http";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";
import {filter} from "rxjs";
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
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
}

