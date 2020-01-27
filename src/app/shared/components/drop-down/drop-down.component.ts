
import {
  Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectionStrategy,
  ContentChildren, QueryList, EventEmitter, Output, Input
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { DropDownOptionComponent } from './components/drop-down-option/drop-down-option.component';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DropDownComponent,
    multi: true
  }],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropDownComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {

  @ContentChildren(DropDownOptionComponent) private options: QueryList<DropDownOptionComponent>;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Input() disabled: false;

  public selectedValue: any;
  public isOptionsListVisible: boolean;
  private componentDestroyed$: Subject<void> = new Subject();

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.options.changes
      .pipe(
        tap((res: any) => {
          debugger;
          console.log(this.options);
          this.setSelectedStyleToOption();
        }),
        // takeUntil(this.componentDestroyed$)
      ).subscribe(res => {
        this.onChange(res);
        this.change.emit(res);
      });
  }

  public onChange(value: any) { }
  public onTouched() { }

  public registerOnChange(fn: any) { this.onChange = fn; }
  public registerOnTouched(fn: any) { this.onTouched = fn; }
  public writeValue(value: any): void {
    this.selectedValue = value;
  }

  private setSelectedStyleToOption(): void {
    //
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
