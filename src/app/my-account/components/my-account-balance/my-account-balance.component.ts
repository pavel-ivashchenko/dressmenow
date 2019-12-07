
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-account-balance',
  templateUrl: './my-account-balance.component.html',
  styleUrls: [
    './my-account-balance.component.scss',
    '../../pages/my-account-home/my-account-home.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAccountBalanceComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
