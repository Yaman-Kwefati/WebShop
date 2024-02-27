import {NgModule, PLATFORM_ID} from "@angular/core";
import {DropdownDirective} from "./directives/dropdown.directive";
import {IntersectionObserverDirective} from "./directives/IntersectionObserverDirective.directive";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth-interceptor";
import {CartItemComponent} from "./header/shopping-cart/cart-item/cart-item.component";
import {UserService} from "./services/user.service";
import {AuthService} from "./services/auth.service";
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {WINDOW} from "../environment /environment";
import {ScullyLibModule} from "@scullyio/ng-lib";

export function windowFactory(platformId: Object): Window | Object {
  return isPlatformBrowser(platformId) ? window : {};
}

@NgModule({
  declarations: [DropdownDirective, IntersectionObserverDirective],
  exports: [DropdownDirective, IntersectionObserverDirective],
  providers: [
    { provide: WINDOW, useFactory: windowFactory, deps: [PLATFORM_ID] },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService,
    AuthService
  ],
  imports: [CartItemComponent, HttpClientModule,
    CommonModule]
})
export class AppModule{

}
