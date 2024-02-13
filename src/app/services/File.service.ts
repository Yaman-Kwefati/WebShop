import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../environment /environment";

export interface ApiResponse<T> {
  code: string;
  payload: T;
  message: string;
}
@Injectable({
  providedIn: "root"
})
export class FileService{
  // private baseUrl: string = 'http://localhost:8080/api/v1/files/';
  private baseUrl: string = environment.serverApiRoute+"/files/";

  constructor(private http: HttpClient) { }

  saveFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<ApiResponse<String>>(this.baseUrl, formData);
  }


  fetchFile(filename: string): Observable<Blob> {
    return this.http.get(this.baseUrl+filename, {
      responseType: 'blob',
    });
  }
}
