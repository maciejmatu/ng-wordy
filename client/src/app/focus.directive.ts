import {Directive, Input, EventEmitter, ElementRef, Renderer, Inject, OnInit, OnDestroy} from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class FocusDirective implements OnInit, OnDestroy {
  @Input('focus') focusEvent: EventEmitter<boolean>;
  subscription;

  constructor(@Inject(ElementRef) private element: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    this.subscription = this.focusEvent.subscribe(event => {
      this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
