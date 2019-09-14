import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-shop-dresses',
  templateUrl: './shop-dresses.component.html',
  styleUrls: ['./shop-dresses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopDressesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
