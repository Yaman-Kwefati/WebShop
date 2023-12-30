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
        this.cookieService.set('userId', String(resData.payload.user.id), 1)
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }, error => {
        this.error = "Email or Password incorrect!"
      }
    );
  }
}
