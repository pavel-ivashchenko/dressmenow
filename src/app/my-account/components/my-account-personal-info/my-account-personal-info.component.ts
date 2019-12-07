
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-account-personal-info',
  templateUrl: './my-account-personal-info.component.html',
  styleUrls: [
    './my-account-personal-info.component.scss',
    '../../pages/my-account-home/my-account-home.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAccountPersonalInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
