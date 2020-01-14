
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Types } from './models';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoesComponent implements OnInit {

  public Types = Types;

  constructor() { }

  ngOnInit() { }

}
