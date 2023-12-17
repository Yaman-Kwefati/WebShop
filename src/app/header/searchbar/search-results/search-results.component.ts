import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppModule} from "../../../app.module";
import {ResultItemComponent} from "./result-item/result-item.component";

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, AppModule, ResultItemComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.less'
})
export class SearchResultsComponent {
}
