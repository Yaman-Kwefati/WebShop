import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.less'
})
export class AboutUsComponent implements OnInit{
  @ViewChild('Main', {static: true}) main!: ElementRef<HTMLDivElement>;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.initScrollAnimations();
  }

  initScrollAnimations(): void{
    gsap.from(this.main.nativeElement, {
      scrollTrigger: {
        trigger: this.main.nativeElement,
        scrub: true,
        start: "top 140%",
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.5,
      y: 100, // Adjust this value based on how much you want to reveal
      opacity: 0,
    });
  }
}
