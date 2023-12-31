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
  products!: Product[];
  // private baseUrl: string = "http://localhost:8080/api/v1/";
  private baseUrl: string = "/api/v1/";
  constructor(private http: HttpClient){}

  fetchProducts(): Observable<ApiResponse<Product[]>>{
    return this.http.get<ApiResponse<Product[]>>(this.baseUrl + "products/all-products");
  }

  fetchProduct(productName: string): Observable<ApiResponse<Product>>{
    return this.http.get<ApiResponse<Product>>(this.baseUrl + "products/" + productName);
  }

  filterProducts(searchTerm: string, products: Product[]) {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  addProduct(name: string, description: string, price: number, stockQuantity: number, images: string[]){
    return this.http.post<ApiResponse<Product>>(this.baseUrl+"products/new-product", {
      name: name,
      description: description,
      price: price,
      images: images,
      stockQuantity: stockQuantity
    });
  }
}
