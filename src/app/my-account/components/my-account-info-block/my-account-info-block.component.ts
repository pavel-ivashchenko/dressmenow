
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-my-account-info-block',
  templateUrl: './my-account-info-block.component.html',
  styleUrls: [
    './my-account-info-block.component.scss',
    '../../pages/my-account-home/my-account-home.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAccountInfoBlockComponent implements OnInit {

  @Input() items: any[] = [];
  @Input() mainTitle: string;
  @Input() noItemsTitle: string;
  @Input() btnTitle: string;

  constructor() { }

  ngOnInit() { }

}
