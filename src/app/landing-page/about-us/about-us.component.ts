import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Platform} from "@angular/cdk/platform";

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.less'
})
export class AboutUsComponent implements AfterViewInit{
  @ViewChild('Main', {static: true}) main!: ElementRef<HTMLDivElement>;

  constructor(@Inject(DOCUMENT) private document: Document,
              private platform: Platform) {
  }

  ngAfterViewInit(): void {
    if (this.platform.isBrowser){
      this.initScrollAnimations();
    }
  }

  initScrollAnimations(): void {
    gsap.utils.toArray<Element>('.container > div').forEach(div => {
      gsap.from(div, {
        scrollTrigger: {
          trigger: div,
          start: 'top bottom-=100', // Adjust this value as needed
          toggleActions: 'play none none none'
        },
        stagger: 1,
        duration: 0.8,
        y: 100,
        opacity: 0,
      });
    });
  }


}
