import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CookieService} from "ngx-cookie-service";
import {OrderService} from "../../services/order.service";
import {gsap} from "gsap";
import {Platform} from "@angular/cdk/platform";

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  providers: [OrderService],
  templateUrl: './success.component.html',
  styleUrl: './success.component.less',
  host: {ngSkipHydration: 'true'},
})
export class SuccessComponent implements OnInit{
  constructor(private cookieService: CookieService,
              private platform: Platform,
              private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    if (this.platform.isBrowser) {
      this.clearCartItems();
      this.cd.detectChanges();
      gsap.from(".text-center", {duration: 1, y: -100, opacity: 0});
    }
  }

  clearCartItems(){
    this.cookieService.delete('cartItems');
  }

}
