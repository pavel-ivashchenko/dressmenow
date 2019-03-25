
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IsShrinkedService } from '@app/core/services';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackToTopComponent {

  constructor(
    private isShrinkedService: IsShrinkedService
  ) { }

  ngOnInit() { }

  public onBackToTopClick(): void {
    window.scrollTo(0,0);
  }

}
