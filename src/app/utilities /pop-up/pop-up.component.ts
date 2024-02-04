import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupService } from '../../services/PopUp.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.less'
})
export class PopUpComponent {
  message: string = '';
  type: string = '';
  widthMainScreenClassPlusadditionalClasses: string = '';
  marginTop: string = '';
  private popupSubscription: Subscription;

  constructor(private popupService: PopupService) {
    this.popupSubscription = this.popupService.message$.subscribe(({ message, type, widthMainScreenClassPlusadditionalClasses}) => {
      this.message = message;
      this.type = type;
      this.widthMainScreenClassPlusadditionalClasses = widthMainScreenClassPlusadditionalClasses;
    });
  }

  ngOnDestroy(): void {
    this.popupSubscription.unsubscribe();
  }
}
