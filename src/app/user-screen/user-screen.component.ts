import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CookieService} from "ngx-cookie-service";
import {User} from "../models/User.model";

@Component({
  selector: 'app-user-screen',
  standalone: true,
  imports: [CommonModule],
  providers: [CookieService],
  templateUrl: './user-screen.component.html',
  styleUrl: './user-screen.component.less'
})
export class UserScreenComponent implements OnInit{
  user!: User;
  address!: string;
  name!: string;

  orders = [
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
    { id: 1, date: '2023-12-01', total: 120.00, status: 'Delivered' },
  ];

  constructor(private cookieService: CookieService) {
  }

  ngOnInit(): void {
    let userId = this.sessionStorage.getItem('userId');
    let firstname = this.sessionStorage.getItem('firstname');
    let lastname = this.sessionStorage.getItem('lastname');
    let email = this.sessionStorage.getItem('email');
    let phoneNumber = this.sessionStorage.getItem('phoneNumber');
    let city = this.sessionStorage.getItem('city');
    let street = this.sessionStorage.getItem('street');
    let postalCode = this.sessionStorage.getItem('postalCode');
    let userRol = this.sessionStorage.getItem('userRol');
    this.user = new User(+userId!, firstname!, lastname!, email!, phoneNumber!, city!, street!, postalCode!, userRol!);
    this.name = this.user.firstname + ", " + this.user.lastname;
    this.address = this.user.postalCode + ", " + this.user.city + ", " + this.user.street;
  }

  protected readonly sessionStorage = sessionStorage;
}
