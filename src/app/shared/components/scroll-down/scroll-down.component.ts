
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

  constructor(
    public isShrinkedService: IsShrinkedService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() { }

  public onScrollDown(): void {
    this.document.documentElement.scrollTo(0, this.scrollTo || this.document.documentElement.clientHeight);
  }

}
