
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-account-home',
  templateUrl: './my-account-home.component.html',
  styleUrls: ['./my-account-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAccountHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
