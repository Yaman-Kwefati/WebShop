import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginatorModule, RouterLink],
  providers: [AuthService],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.less'
})
export class ForgotPasswordComponent {
  constructor(private auth: AuthService,
              private router: Router) {
  }
  onsubmit(loginForm: NgForm){
    if (!loginForm.valid){
      return;
    }
    const email = loginForm.value.email;
    this.auth.requestPasswordChange(email).subscribe(
      respone => {
        this.router.navigate(['email-sent'], {
          queryParams: {
            email: email
          }
        });
      }
    );
  }
}
