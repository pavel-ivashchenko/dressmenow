
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeartComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
