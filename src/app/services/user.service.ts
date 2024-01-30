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
  private baseUrl: string = "http://localhost:8080/api/v1/";
  // private baseUrl: string = "/api/v1/";

  constructor(private http: HttpClient){}

  fetchUsers(): Observable<ApiResponse<User[]>>{
    return this.http.get<ApiResponse<User[]>>(this.baseUrl + "users/all-users");
  }

  fetchUser(userId: string): Observable<ApiResponse<User>>{
    return this.http.get<ApiResponse<User>>(this.baseUrl + "users/" + userId);
  }

  updateUserInfo(user: User){
    return this.http.put<ApiResponse<User>>(this.baseUrl + "users/" + user.id, {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      city: user.city,
      street: user.street,
      postalCode: user.postalCode
    });
  }
}
