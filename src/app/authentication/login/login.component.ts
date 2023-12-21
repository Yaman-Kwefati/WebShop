import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {User} from "../../models/User.model";

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
  user!: User;

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router) {
  }

  onsubmit(loginForm: NgForm){
    if (!loginForm.valid){
      return;
    }
    this.authService.signUserIn(loginForm.value.email, loginForm.value.password).subscribe(
      resData => {
        console.log(resData)
        this.user = resData.payload.user;
        console.log("user: "+this.user.firstname);
        sessionStorage.setItem('userId', String(resData.payload.user.id));
        sessionStorage.setItem('firstname', resData.payload.user.firstname);
        sessionStorage.setItem('lastname', resData.payload.user.lastname);
        sessionStorage.setItem('email', resData.payload.user.email);
        sessionStorage.setItem('phoneNumber', resData.payload.user.phoneNumber);
        sessionStorage.setItem('city', resData.payload.user.city);
        sessionStorage.setItem('street', resData.payload.user.street);
        sessionStorage.setItem('postalCode', resData.payload.user.postalCode);
        sessionStorage.setItem('userRol', resData.payload.user.userRole);
      }, error => {
        this.error = "Email or Password incorrect!"
      }
    );
    // this.router.navigate(['/']);
  }
}
