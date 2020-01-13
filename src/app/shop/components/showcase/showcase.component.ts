
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { SortOptions } from './models';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcaseComponent implements OnInit {

  @Input() types: any[];
  @Input() sortOptions: any[] = SortOptions;

  public currTypeName: string;
  public isVisible = false;

  constructor() { }

  ngOnInit() {
    this.currTypeName = this.types.length ? this.types[0].name : '';
  }

  // PUBLIC METHODS

  public onTypeChange(): void {

  }

  public onTest(): void {
    this.isVisible = !this.isVisible;
  }

}
