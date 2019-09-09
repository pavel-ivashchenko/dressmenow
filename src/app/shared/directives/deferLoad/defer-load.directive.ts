
import { Directive, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appDeferLoad]'
})
export class DeferLoadDirective implements AfterViewInit {

  @Output() public deferLoad: EventEmitter<any> = new EventEmitter();

  private intersectionObserver?: IntersectionObserver;

  constructor (
    private element: ElementRef
  ) { }

  ngAfterViewInit () {

    this.intersectionObserver = new IntersectionObserver(entries => {
      this.checkForIntersection(entries);
    }, {});

    this.intersectionObserver.observe(<Element>(this.element.nativeElement));

  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {

    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry)) {
        this.deferLoad.emit();
        this.intersectionObserver.unobserve(<Element>(this.element.nativeElement));
        this.intersectionObserver.disconnect();
      }
    });

  }

  private checkIfIntersecting (entry: IntersectionObserverEntry) {
    return (<any>entry).isIntersecting && entry.target === this.element.nativeElement;
  }

}
