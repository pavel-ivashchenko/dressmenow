
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-account-recently-viewed',
  templateUrl: './my-account-recently-viewed.component.html',
  styleUrls: [
    './my-account-recently-viewed.component.scss',
    '../../pages/my-account-home/my-account-home.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAccountRecentlyViewedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
