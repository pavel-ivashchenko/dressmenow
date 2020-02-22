
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-stars-set',
  templateUrl: './stars-set.component.html',
  styleUrls: ['./stars-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarsSetComponent implements OnInit {

  @Input('rate') rate: number = 0;

  public STARS_QTY: number = 5;
  public fullStarsQty: number;
  public halfStarIdx: number | null;

  constructor() { }

  ngOnInit() {
    this.fullStarsQty = Math.trunc(this.rate);
    this.halfStarIdx = !Number.isInteger(this.rate) ? Math.trunc(this.rate) + 1 : null;
  }

}
