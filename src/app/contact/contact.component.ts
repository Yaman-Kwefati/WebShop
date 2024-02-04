import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { Platform } from '@angular/cdk/platform';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.less'
})
export class ContactComponent implements OnInit, AfterViewInit {
  @ViewChild('Main', {static: true}) main!: ElementRef<HTMLDivElement>;

  constructor(@Inject(DOCUMENT) private document: Document,
              private platform: Platform) {
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.platform.isBrowser){
      this.initialAnimations();
    }
  }

  initialAnimations(): void {
    gsap.from(this.main.nativeElement.childNodes, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 0.5,
    });
  }
}
