import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-orders-home',
  templateUrl: './orders-home.component.html',
  styleUrls: ['./orders-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
