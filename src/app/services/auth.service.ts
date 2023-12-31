import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User.model";

export interface ApiResponse<T> {
  code: string;
  payload: T;
  message: string;
}
interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}
interface Token{
  accessToken: string;
  refreshToken: string;
}
@Injectable()
export class AuthService{
  // private loginUrl: string = "http://localhost:8080/api/v1/auth/authenticate";
  // private registerUrl: string = "http://localhost:8080/api/v1/auth/register";
  private loginUrl: string = "/api/v1/auth/authenticate";
  private registerUrl: string = "/api/v1/auth/register";

  constructor(private http: HttpClient){}

  signUserIn(email: string, password: string) {
    return this.http.post<ApiResponse<LoginResponse>>(this.loginUrl, {
      email: email,
      password: password
    });
  }

  registerUser(firstname: string, lastname: string, email: string, password: string, phoneNumber: string, city: string, street: string, postalCode: string){
    return this.http.post<ApiResponse<User>>(this.registerUrl, {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      city: city,
      street: street,
      postalCode: postalCode,
    });
  }

  refreshToken(){
    return this.http.post<Token>("http://localhost:8080/api/v1/auth/refresh-token", {});
  }

  logout(){
    return this.http.post("http://localhost:8080/api/v1/auth/logout", {});
  }
}
