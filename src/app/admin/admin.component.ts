import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../services/user.service";
import {Tab, initTE,} from "tw-elements";
import {MatTabsModule} from "@angular/material/tabs";
import {UsersComponent} from "./users/users.component";
import {ProductsTabComponent} from "./products/products-tab.component";
import {OrdersComponent} from "./orders/orders.component";

initTE({Tab})

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatTabsModule, UsersComponent, ProductsTabComponent, OrdersComponent],
  providers: [UserService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.less'
})
export class AdminComponent implements OnInit{

  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
  }
  onTabClick(event: MouseEvent, tabId: string): void {
    event.preventDefault();
  }
}
