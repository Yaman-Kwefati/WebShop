import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

export interface ApiResponse<T> {
  code: string;
  payload: T;
  message: string;
}
@Injectable({
  providedIn: "root"
})
export class FileService{
  private baseUrl: string = 'https://430b-2a02-a445-1c3-0-e0ba-c652-bcfb-f09a.ngrok-free.app/api/v1/files/';
  // private baseUrl: string = '/api/v1/files/';

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
