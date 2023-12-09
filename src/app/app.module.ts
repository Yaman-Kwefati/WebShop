import {NgModule} from "@angular/core";
import {DropdownDirective} from "./directives/dropdown.directive";
import {HeaderComponent} from "./header/header.component";

@NgModule({
  declarations: [DropdownDirective],
  exports: [DropdownDirective],
})
export class AppModule{

}
