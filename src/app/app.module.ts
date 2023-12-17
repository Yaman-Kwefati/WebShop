import {NgModule} from "@angular/core";
import {DropdownDirective} from "./directives/dropdown.directive";
import {HeaderComponent} from "./header/header.component";
import {IntersectionObserverDirective} from "./directives/IntersectionObserverDirective.directive";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [DropdownDirective, IntersectionObserverDirective],
  exports: [DropdownDirective, IntersectionObserverDirective],
})
export class AppModule{

}
