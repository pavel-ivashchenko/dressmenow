
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-colors-set',
  templateUrl: './colors-set.component.html',
  styleUrls: ['./colors-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsSetComponent implements OnInit {

  @Input() colors: string[];

  constructor() { }

  ngOnInit() { }

}
