import {Directive, ElementRef, Output, EventEmitter, HostListener, Inject} from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  @Output() public clickOutside = new EventEmitter<MouseEvent>();

  constructor(@Inject(ElementRef) private element: ElementRef) {
  }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    if (!this.element.nativeElement.contains(targetElement)) {
      this.clickOutside.emit(event);
    }
  }
}
