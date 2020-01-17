
import { Component, OnInit, ChangeDetectionStrategy, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Observable } from 'rxjs';

import { toggleVisiblityOnScroll } from '@app/shared/helpers';

@Component({
  selector: 'app-scroll-down',
  templateUrl: './scroll-down.component.html',
  styleUrls: ['./scroll-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollDownComponent implements OnInit {

  @Input() scrollTo: number = null;
  @Input() elem: HTMLElement;
  @Input() hideOnHeight = 200;

  public isVisible$: Observable<boolean>;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.isVisible$ = toggleVisiblityOnScroll(this.elem || this.document.documentElement, this.hideOnHeight, false);
  }

  // PUBLIC METHODS

  public onScrollDown(): void {
    this.scrollElem(
      this.elem || this.document.documentElement,
      this.scrollTo || this.document.documentElement.clientHeight
    );
  }

  // PRIVATE METHODS

  private scrollElem(elem: HTMLElement, scrollTo: number): void {
    elem.scrollTo(0, scrollTo);
  }

}
