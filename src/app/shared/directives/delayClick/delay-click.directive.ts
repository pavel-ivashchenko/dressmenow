
import { Directive, EventEmitter, HostListener, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { throttleTime, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appDelayClick]'
})
export class DelayClickDirective implements OnInit, OnDestroy {

  @Input() delayTime = 1000;
  @Output() delayClick: EventEmitter<MouseEvent> = new EventEmitter();
  private componentDestroyed$: Subject<void> = new Subject();
  private clicks: Subject<MouseEvent> = new Subject();

  constructor() { }

  ngOnInit() {
    this.clicks
      .pipe(
        takeUntil(this.componentDestroyed$),
        throttleTime(this.delayTime)
      ).subscribe(e => this.delayClick.emit(e));
  }

  @HostListener('click', ['$event'])
    clickEvent(event: MouseEvent) {
      event.preventDefault();
      event.stopPropagation();
      this.clicks.next(event);
    }

  ngOnDestroy() {
    this.componentDestroyed$.next();
  }

}
