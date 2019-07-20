
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { IsShrinkedService } from '@app/core/services';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackToTopComponent {

  constructor(
    public isShrinkedService: IsShrinkedService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() { }

  public onBackToTopClick(): void {
    this.document.documentElement.scrollTo(0,0);
  }

}
