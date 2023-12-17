import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {User} from "../../models/User.model";
import {AuthService} from "../../services/auth.service";
import {LoadingSpinnerComponent} from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LoadingSpinnerComponent],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent {
  isLoading = false;
  user!: User;
  error!: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }
  onsubmit(registerForm: NgForm) {
    if (!registerForm.valid){
      return;
    }
    const firstname = registerForm.value.firstname;
    const lastname = registerForm.value.lastname;
    const email =   registerForm.value.email;
    const phoneNumber =   registerForm.value.phonenumber;
    const password =   registerForm.value.password;
    const city =   registerForm.value.city;
    const street =   registerForm.value.street;
    const postalCode =   registerForm.value.postalcode;
    const role =  "CUSTOMER";
    this.isLoading = true;
    this.authService.registerUser(firstname, lastname, email,
      phoneNumber, password, city, street, postalCode).subscribe(
      resData =>{
        this.user = resData.payload;
        this.user.access_token = resData.payload.access_token;
        this.user.refresh_token = resData.payload.refresh_token;
        this.isLoading = false;
    }, error => {
        this.error = "User already exist";
        this.isLoading = false;
      }
    );
    registerForm.reset();
  }
}
