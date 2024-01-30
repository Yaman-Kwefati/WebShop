import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private messageSubject: BehaviorSubject<{
    message: string; 
    type: string; widthMainScreenClassPlusadditionalClasses: string
  }> = new BehaviorSubject<{
    message: string;
    type: string;
    widthMainScreenClassPlusadditionalClasses: string
  }>({
    message: '',
    type: '',
    widthMainScreenClassPlusadditionalClasses: ''
  });
  public message$ = this.messageSubject.asObservable();

  showMessage(message: string, type: string, widthMainScreenClassPlusadditionalClasses: string): void {
    this.messageSubject.next({ message, type, widthMainScreenClassPlusadditionalClasses});

    setTimeout(() => {
      this.messageSubject.next({ message: '', type: '', widthMainScreenClassPlusadditionalClasses: ''});
    }, 2000);
  }
}