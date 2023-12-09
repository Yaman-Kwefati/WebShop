import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.less'
})
export class SearchbarComponent {
  searchBarEmpty = true;
  isSearchBarExpanded = false;

  expandSearchBar() {
    this.isSearchBarExpanded = !this.isSearchBarExpanded;
  }
}
