import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CookieService} from "ngx-cookie-service";
import {User} from "../models/User.model";
import {UserService} from "../services/user.service";
import {OrderService} from "../services/order.service";
import {ShopOrder} from "../models/ShopOrder.model";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-screen',
  standalone: true,
  imports: [CommonModule],
  providers: [CookieService, UserService, OrderService, AuthService],
  templateUrl: './user-screen.component.html',
  styleUrl: './user-screen.component.less'
})
export class UserScreenComponent implements OnInit{
  user!: User;
  address!: string;
  name!: string;

  orders: ShopOrder[] = [];

  constructor(private cookieService: CookieService,
              private userService: UserService,
              private orderService: OrderService,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    let userId = this.cookieService.get('userId');
    this.userService.fetchUser(userId).subscribe(
      response => {
        this.user = response.payload;
        this.name = this.user.firstname + ", " + this.user.lastname;
        this.address = this.user.postalCode + ", " + this.user.city + ", " + this.user.street;
        if (this.user){
          this.orderService.getUsersOrders(this.user.email).subscribe(
            response => {
              this.orders = response.payload;
            }
          );
        }
      }
    );
  }
  clearCookies(){
    if (this.getLoggedInUserId()){
      this.auth.logout().subscribe(
        () => {
          this.router.navigate(['/']);
        }
      );
      this.cookieService.deleteAll();
      this.router.navigate(['/']);
    }
  }
  getLoggedInUserId(){
    return this.cookieService.get('userId');
  }

}
