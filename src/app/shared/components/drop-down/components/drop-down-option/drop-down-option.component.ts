
import {
  Component, OnInit, ChangeDetectionStrategy, Input, Output,
  EventEmitter, ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-drop-down-option',
  templateUrl: './drop-down-option.component.html',
  styleUrls: [
    './drop-down-option.component.scss',
    '../../drop-down.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropDownOptionComponent implements OnInit {

  @Input() option: any;
  @Output() change: EventEmitter<any> = new EventEmitter();

  public optionId: number;
  public set isSelected(value: boolean) { this._isSelected = value; this.cdr.detectChanges(); }
  public get isSelected() { return this._isSelected; }

  private _isSelected = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.optionId = Math.floor(Math.random() * Math.floor(1e10));
  }

  public onChange(): void {
    this.isSelected = true;
    this.change.emit({
      option: this.option,
      optionId: this.optionId
    });
  }

}
