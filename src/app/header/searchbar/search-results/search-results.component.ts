import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppModule} from "../../../app.module";

@Component({
  selector: 'app-search-results',
  standalone: true,
    imports: [CommonModule, AppModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.less'
})
export class SearchResultsComponent {
  searchBarEmpty = true;
}
