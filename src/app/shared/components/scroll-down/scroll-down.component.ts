
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { IsShrinkedService } from '@app/core/services';

@Component({
  selector: 'app-scroll-down',
  templateUrl: './scroll-down.component.html',
  styleUrls: ['./scroll-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollDownComponent implements OnInit {

  constructor(
    public isShrinkedService: IsShrinkedService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() { }

  public onScrollDown(): void {
    this.document.documentElement.scrollTo(0, this.document.documentElement.clientHeight);
  }

}
