
import { Component, ChangeDetectionStrategy, Inject, Input, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Observable } from 'rxjs';

import { toggleVisiblityOnScroll } from '@app/shared/helpers';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackToTopComponent implements OnInit {

  @Input() elem: HTMLElement;
  @Input() showOnHeight = 200;

  public isVisible$: Observable<boolean>;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.isVisible$ = toggleVisiblityOnScroll(this.elem || this.document.documentElement, this.showOnHeight);
  }

  public onBackToTopClick(): void {
    this.document.documentElement.scrollTo(0, 0);
  }

}
