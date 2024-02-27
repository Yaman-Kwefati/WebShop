import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule,} from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
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
import {PopUpComponent} from "./utilities /pop-up/pop-up.component";
import {MailchimpSignupComponent} from "./shared/mailchimp-signup/mailchimp-signup.component";
import {Platform} from "@angular/cdk/platform";
import {WINDOW} from "../environment /environment";
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, AppModule, LandingPageComponent,
    HttpClientModule, FontAwesomeModule, LoadingSpinnerComponent, PopUpComponent, MailchimpSignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit{
  constructor(private router: Router,
              private platform: Platform,
              @Inject(WINDOW) private window: Window) {
  }
  ngOnInit(): void {
    if (this.platform.isBrowser) this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.window.scrollTo(0, 0);
    });
  }
}

