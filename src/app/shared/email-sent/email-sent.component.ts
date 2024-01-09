import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-email-sent',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './email-sent.component.html',
  styleUrl: './email-sent.component.less'
})
export class EmailSentComponent {
  email: string = "";

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(
      params => {
        this.email = params['email'];
      }
    )
  }
}
