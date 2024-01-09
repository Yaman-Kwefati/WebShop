import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/Product.model";
import {User} from "../models/User.model";


export interface ApiResponse<T> {
  code: string;
  payload: T;
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService{
  private baseUrl: string = "https://430b-2a02-a445-1c3-0-e0ba-c652-bcfb-f09a.ngrok-free.app/api/v1/";
  // private baseUrl: string = "/api/v1/";

  constructor(private http: HttpClient){}

  fetchUsers(): Observable<ApiResponse<User[]>>{
    return this.http.get<ApiResponse<User[]>>(this.baseUrl + "users/all-users", {
      headers: new HttpHeaders().append("ngrok-skip-browser-warning", "true")
    });
  }

  fetchUser(userId: string): Observable<ApiResponse<User>>{
    return this.http.get<ApiResponse<User>>(this.baseUrl + "users/" + userId, {
      headers: new HttpHeaders().append("ngrok-skip-browser-warning", "true")
    });
  }
}
