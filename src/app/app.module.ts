import {NgModule} from "@angular/core";
import {DropdownDirective} from "./directives/dropdown.directive";
import {IntersectionObserverDirective} from "./directives/IntersectionObserverDirective.directive";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth-interceptor";
import {CartItemComponent} from "./header/shopping-cart/cart-item/cart-item.component";
import {UserService} from "./services/user.service";
import {AuthService} from "./services/auth.service";
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [DropdownDirective, IntersectionObserverDirective],
  exports: [DropdownDirective, IntersectionObserverDirective],
  providers: [
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
