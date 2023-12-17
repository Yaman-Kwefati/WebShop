import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.less'
})
export class SearchbarComponent {
  @Output() openSearchReults = new EventEmitter<void>();
  @Output() openSearchBar = new EventEmitter<boolean>();
  isSearchBarExpanded = false;

  openSearchModal(){
    this.openSearchReults.emit();
  }

  expandSearchBar() {
    this.isSearchBarExpanded = !this.isSearchBarExpanded;
    this.openSearchBar.emit(this.isSearchBarExpanded);
  }
}
