import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CookieService} from "ngx-cookie-service";
import {User} from "../models/User.model";
import {UserService} from "../services/user.service";
import {OrderService} from "../services/order.service";
import {ShopOrder} from "../models/ShopOrder.model";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../models/Product.model";
import {ProductService} from "../services/product.service";
import {UserOrderItemComponent} from "./user-order-item/user-order-item.component";
import {UserOrderDetailsComponent} from "./user-order-details/user-order-details.component";
import {FormsModule} from "@angular/forms";
import {PopupService} from "../services/PopUp.service";
import {Platform} from "@angular/cdk/platform";

@Component({
  selector: 'app-user-screen',
  standalone: true,
  imports: [CommonModule, UserOrderItemComponent, UserOrderDetailsComponent, FormsModule],
  providers: [CookieService, UserService, OrderService, AuthService, ProductService],
  templateUrl: './user-screen.component.html',
  styleUrl: './user-screen.component.less'
})
export class UserScreenComponent implements OnInit{
  user!: User;
  address!: string;
  name!: string;
  orderId!: number;
  showEditForm = false;
  products!: Product[];
  orders: ShopOrder[] = [];

  constructor(private cookieService: CookieService,
              private userService: UserService,
              private orderService: OrderService,
              private auth: AuthService,
              private router: Router,
              private popupService: PopupService,
              private platform: Platform) {
  }

  ngOnInit(): void {
    let userId = this.cookieService.get('userId');
    if (userId && this.platform.isBrowser){
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
  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
  }
  submitForm() {
    this.userService.updateUserInfo(this.user).subscribe(
      response => {
        if (response.code != "ACCEPTED") this.popupService
          .showMessage("Couldn't save new Info", "error", "w-4/6 max-md:w-full");
       if (response.code == "ACCEPTED")
          this.popupService.showMessage('Info updated successfully', 'success', 'w-4/6 max-md:w-full');
        this.showEditForm = false;
      }
    );
  }
}
