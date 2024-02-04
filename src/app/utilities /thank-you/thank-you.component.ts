import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.less'
})
export class ThankYouComponent {

}
