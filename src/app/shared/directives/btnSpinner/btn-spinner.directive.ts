
import {
  Directive, Input, ElementRef, Renderer2,
  AfterViewInit, OnChanges, SimpleChanges, HostListener
} from '@angular/core';

@Directive({
  selector: '[appBtnSpinner]'
})
export class BtnSpinnerDirective implements AfterViewInit, OnChanges {

  @Input() disabled: boolean;
  @Input() clear = true;

  @Input()
  set appBtnSpinner(loading: boolean) {
    this.loading = loading;

    if (this.elementRef && this.rect && this.innerHtml) {
      this.loading ? this.setLoadingState() : this.setDefaultState();
    }
  }

  private loading: boolean;
  private innerHtml: any;
  private rect: ClientRect;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    this.innerHtml = this.elementRef.nativeElement.innerHTML;
    this.rect = this.elementRef.nativeElement.getBoundingClientRect();

    this.appBtnSpinner = this.loading;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['disabled']) {
      this.setDisabled(this.disabled);
    }
  }

  @HostListener('click', ['$event'])
  onClick(event) {
    if (this.loading) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  private setLoadingState(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'is-loading');

    if (this.clear) {
      this.elementRef.nativeElement.innerHTML = '';
    }

    if (this.rect.width && this.rect.height) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.rect.width}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${this.rect.height}px`);
      this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', 'disabled');
    }
  }

  private setDefaultState(): void {
    this.renderer.removeClass(this.elementRef.nativeElement, 'is-loading');

    if (this.clear) {
      this.elementRef.nativeElement.innerHTML = this.innerHtml;
    }

    this.renderer.removeStyle(this.elementRef.nativeElement, 'width');
    this.renderer.removeStyle(this.elementRef.nativeElement, 'height');


    this.setDisabled(this.disabled);
  }

  private setDisabled(state: boolean) {
    state ?
      this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', 'disabled')
        : this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
  }

}
