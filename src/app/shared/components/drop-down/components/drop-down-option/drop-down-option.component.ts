
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-down-option',
  templateUrl: './drop-down-option.component.html',
  styleUrls: [
    './drop-down-option.component.scss',
    '../../drop-down.component.scss'
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropDownOptionComponent implements OnInit {

  @Input() option: any;
  @Output() change: EventEmitter<any> = new EventEmitter();

  public isSelected = false;

  constructor() { }

  ngOnInit() {
  }

  public onChange(value: any): void {
    debugger;
    this.isSelected = true;
    this.change.emit(value);
  }

}
