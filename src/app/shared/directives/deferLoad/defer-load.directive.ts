
import { Directive, Output, EventEmitter, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[appDeferLoad]'
})
export class DeferLoadDirective implements AfterViewInit {

  @Input() public checkOnce = false;
  @Output() public deferLoad: EventEmitter<any> = new EventEmitter();

  private intersectionObserver: IntersectionObserver;
  private currStatus = false;

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
      if (this.checkIfIntersecting(entry) !== this.currStatus) {
        this.currStatus = this.checkIfIntersecting(entry);
        this.deferLoad.emit(this.currStatus);
        this.checkOnce && this.stopObserving(this.intersectionObserver, this.element.nativeElement);
      }
    });
  }

  private checkIfIntersecting (entry: IntersectionObserverEntry): boolean {
    return (<any>entry).isIntersecting && entry.target === this.element.nativeElement;
  }

  private stopObserving(intersectionObserver: IntersectionObserver, element: HTMLElement): void {
    intersectionObserver.unobserve(<Element>(element));
    intersectionObserver.disconnect();
  }

}
