import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      withCredentials: true,
    });

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          const authService = this.injector.get(AuthService);
          return this.handle401Error(authReq, next, authService);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler, authService: AuthService): Observable<HttpEvent<any>> {
    return authService.refreshToken().pipe(
      switchMap(() => {
        return next.handle(request);
      }),
      catchError(err => {
        this.router.navigate(['/login']);
        return throwError(err);
      })
    );

  }
}
