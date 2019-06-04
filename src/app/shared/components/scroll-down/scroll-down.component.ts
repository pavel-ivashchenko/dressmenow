
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IsShrinkedService } from '@app/core/services';

@Component({
  selector: 'app-scroll-down',
  templateUrl: './scroll-down.component.html',
  styleUrls: ['./scroll-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollDownComponent implements OnInit {

  constructor(
    public isShrinkedService: IsShrinkedService
  ) { }

  ngOnInit() {
  }

  public onScrollDown(): void {
    
  }

}
