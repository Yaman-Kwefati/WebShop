import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/Product.model";
import {environment} from "../../environment /environment";


export interface ApiResponse<T> {
    code: string;
    payload: T;
    message: string;
}
@Injectable()
export class ProductService{
  products!: Product[];
  // private baseUrl: string = "http://localhost:8080/api/v1";
  private baseUrl: string = environment.serverApiRoute;
  constructor(private http: HttpClient){}

  fetchProducts(): Observable<ApiResponse<Product[]>>{
    return this.http.get<ApiResponse<Product[]>>(this.baseUrl + "/products/all-products");
  }

  fetchProduct(productName: string): Observable<ApiResponse<Product>>{
    return this.http.get<ApiResponse<Product>>(this.baseUrl + "/products/name/" + productName);
  }

  fetchProductById(productId: number){
    return this.http.get<ApiResponse<Product>>(this.baseUrl + "/products/id/" + productId);
  }

  filterProducts(searchTerm: string, products: Product[]) {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  addProduct(name: string, description: string, price: number, stockQuantity: number, images: string[]){
    return this.http.post<ApiResponse<Product>>(this.baseUrl+"/products/new-product", {
      name: name,
      description: description,
      price: price,
      images: images,
      stockQuantity: stockQuantity
    });
  }

  deleteProduct(productId: number){
    return this.http.delete<ApiResponse<string>>(this.baseUrl + "/products/" + productId)
  }
}
