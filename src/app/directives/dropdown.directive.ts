import { Directive, ElementRef, HostBinding, HostListener, Output, EventEmitter } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @Output() isProfileMenuOpenChange = new EventEmitter<boolean>();

  private _isProfileMenuOpen = false;

  @HostBinding('class.open')
  get isProfileMenuOpen() {
    return this._isProfileMenuOpen;
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopPropagation();
    this._isProfileMenuOpen = !this._isProfileMenuOpen;
    this.isProfileMenuOpenChange.emit(this._isProfileMenuOpen);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this._isProfileMenuOpen = false;
      this.isProfileMenuOpenChange.emit(this._isProfileMenuOpen);
    }
  }

  constructor(private elRef: ElementRef) {}
}
