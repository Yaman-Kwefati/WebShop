import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {LoadingSpinnerComponent} from "../../../../shared/loading-spinner/loading-spinner.component";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginatorModule, RouterLink, LoadingSpinnerComponent],
  providers: [AuthService],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.less'
})
export class ResetPasswordComponent implements OnInit{
  isLoading = true;
  token!: string;
  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.token = params['token'];
        this.auth.validateToken(this.token).subscribe(
          respone => {
            if (respone.code == "OK"){
              this.isLoading = false;
            } else {
              this.isLoading = false;
              alert("Token invalid");
            }
          }
        );
      }
    );
  }

  onsubmit(loginForm: NgForm){
    if (!loginForm.valid){
      return;
    }
    this.auth.savePassword(this.token, loginForm.value.newPassword).subscribe(
      response => {
        this.router.navigate(['/login']);
      }
    );
  }
}
