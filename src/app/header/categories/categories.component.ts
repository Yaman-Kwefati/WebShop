import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.less'
})
export class CategoriesComponent {

    categoryClicked() {
        console.log("Category CLcked")
    }
}
