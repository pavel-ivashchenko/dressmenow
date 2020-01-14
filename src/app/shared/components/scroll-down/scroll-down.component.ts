
import { Component, OnInit, ChangeDetectionStrategy, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { IsShrinkedService } from '@app/core/services';

@Component({
  selector: 'app-scroll-down',
  templateUrl: './scroll-down.component.html',
  styleUrls: ['./scroll-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollDownComponent implements OnInit {

  @Input() scrollTo: number = null;
  @Input() elem: HTMLElement;

  constructor(
    public isShrinkedService: IsShrinkedService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() { }

  public onScrollDown(): void {
    this.scrollElem(
      this.elem || this.document.documentElement,
      this.scrollTo || this.document.documentElement.clientHeight
    );
  }

  private scrollElem(elem: HTMLElement, scrollTo: number): void {
    elem.scrollTo(0, scrollTo);
  }

}
