import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {User} from "../models/User.model";
import {environment} from "../../environment /environment";

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
  // private baseUrl: string = "http://localhost:8080/api/v1/auth/";
  // private loginUrl: string = "http://localhost:8080/api/v1/auth/authenticate";
  // private registerUrl: string = "http://localhost:8080/api/v1/auth/register";
  private baseUrl: string = "/api/v1/auth/";
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
    return this.http.post<Token>(environment.serverApiRoute+"/auth/refresh-token", {});
  }

  logout(){
    return this.http.post(environment.serverApiRoute+"/auth/logout", {});
  }

  requestPasswordChange(userEmail: string){
    const params = new HttpParams().append('email', userEmail);
    return this.http.post(this.baseUrl + "resetPassword", {}, {
      params: params,
    });
  }

  validateToken(token: string){
    const params = new HttpParams().append('token', token);
    return this.http.get<ApiResponse<String>>(this.baseUrl + "changePassword", {
      params: params,
    });
  }

  savePassword(token: string, newPassword: string){
    return this.http.post<ApiResponse<any>>(this.baseUrl + "savePassword", {
      token: token,
      newPassword: newPassword
    });
  }
}
