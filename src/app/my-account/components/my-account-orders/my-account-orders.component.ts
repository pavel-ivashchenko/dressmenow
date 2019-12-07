
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-my-account-orders',
  templateUrl: './my-account-orders.component.html',
  styleUrls: [
    './my-account-orders.component.scss',
    '../../pages/my-account-home/my-account-home.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAccountOrdersComponent implements OnInit {

  @Input() orders;

  constructor() { }

  ngOnInit() { }

}
