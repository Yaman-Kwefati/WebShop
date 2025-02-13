import {NgModule} from "@angular/core";
import {DropdownDirective} from "./directives/dropdown.directive";
import {IntersectionObserverDirective} from "./directives/IntersectionObserverDirective.directive";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth-interceptor";
import {CartItemComponent} from "./header/shopping-cart/cart-item/cart-item.component";
import {UserService} from "./services/user.service";
import {AuthService} from "./services/auth.service";

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
  imports: [CartItemComponent,]
})
export class AppModule{

}
