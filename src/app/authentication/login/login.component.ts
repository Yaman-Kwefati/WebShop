import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  error!: string;

  constructor(private authService: AuthService,
              private cookieService: CookieService) {
  }

  onsubmit(loginForm: NgForm){
    if (!loginForm.valid){
      return;
    }
    this.authService.signUserIn(loginForm.value.email, loginForm.value.password).subscribe(
      resData => {
        // console.log(resData.payload)
        sessionStorage.setItem('userId', String(resData.payload.id));
        sessionStorage.setItem('firstname', resData.payload.firstname);
        sessionStorage.setItem('lastname', resData.payload.lastname);
        sessionStorage.setItem('email', resData.payload.email);
        sessionStorage.setItem('phoneNumber', resData.payload.phoneNumber);
        sessionStorage.setItem('city', resData.payload.city);
        sessionStorage.setItem('street', resData.payload.street);
        sessionStorage.setItem('postalCode', resData.payload.postalCode);
        sessionStorage.setItem('userRol', resData.payload.role);

        this.cookieService.set("accessToken", "Bearer " + resData.payload.access_token);
        this.cookieService.set("refreshToken", "Bearer " + resData.payload.refresh_token);
      }, error => {
        this.error = "Email or Password incorrect!"
      }
    );
  }
}
