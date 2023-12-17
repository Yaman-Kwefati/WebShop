import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/Product.model";


export interface ApiResponse<T> {
    code: string;
    payload: T;
    message: string;
}
@Injectable()
export class ProductService{
    private baseUrl: string = "http://localhost:8080/api/v1/";

    constructor(private http: HttpClient){}

    fetchProducts(): Observable<ApiResponse<Product[]>>{
        return this.http.get<ApiResponse<Product[]>>(this.baseUrl + "products/all-products");
    }

    fetchProduct(productName: string): Observable<ApiResponse<Product>>{
      return this.http.get<ApiResponse<Product>>(this.baseUrl + "products/" + productName);
    }
}
