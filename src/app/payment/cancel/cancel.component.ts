import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-cancel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cancel.component.html',
  styleUrl: './cancel.component.less'
})
export class CancelComponent implements OnInit{
  ngOnInit(): void {
    gsap.from(".text-center", { duration: 1, y: -100, opacity: 0 });
  }
}
