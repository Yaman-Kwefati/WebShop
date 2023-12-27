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
        this.user = resData.payload.user;
        this.cookieService.set('userId', String(resData.payload.user.id), 1)
        // this.cookieService.set('firstname', resData.payload.user.firstname, 1);
        // this.cookieService.set('lastname', resData.payload.user.lastname, 1);
        // this.cookieService.set('email', resData.payload.user.email, 1);
        // this.cookieService.set('phoneNumber', resData.payload.user.phoneNumber, 1);
        // this.cookieService.set('city', resData.payload.user.city, 1);
        // this.cookieService.set('street', resData.payload.user.street, 1);
        // this.cookieService.set('postalCode', resData.payload.user.postalCode, 1);
        // this.cookieService.set('userRole', resData.payload.user.userRole, 1);
        this.router.navigate(['/']);
      }, error => {
        this.error = "Email or Password incorrect!"
      }
    );
    console.log(this.cookieService.getAll())
  }
}
