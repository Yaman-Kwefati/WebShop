import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import {Platform} from "@angular/cdk/platform";

@Component({
  selector: 'app-cancel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cancel.component.html',
  styleUrl: './cancel.component.less',
  host: {ngSkipHydration: 'true'},
})
export class CancelComponent implements OnInit{
  constructor(private platform: Platform) {
  }
  ngOnInit(): void {
    if (this.platform.isBrowser)
      gsap.from(".text-center", { duration: 1, y: -100, opacity: 0 });
  }
}
