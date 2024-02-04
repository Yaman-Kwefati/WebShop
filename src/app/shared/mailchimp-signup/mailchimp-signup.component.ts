import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-mailchimp-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mailchimp-signup.component.html',
  styleUrl: './mailchimp-signup.component.less'
})
export class MailchimpSignupComponent {
}
