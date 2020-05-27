
import {
  Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectionStrategy,
  ContentChildren, QueryList, EventEmitter, Output, Input, ChangeDetectorRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { Subject, merge } from 'rxjs';
import { takeUntil, tap, map, switchMap, startWith } from 'rxjs/operators';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropDownComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {

  @ContentChildren(DropDownOptionComponent) private options: QueryList<DropDownOptionComponent>;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Input() disabled: false;

  public selectedValue: any;
  public isOptionsListVisible: boolean;
  private componentDestroyed$: Subject<void> = new Subject();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterViewInit() {
    let currOption = null;
    this.options.changes
      .pipe(
        startWith(this.options),
        map((options: any) => options.map(o => {
          currOption = !currOption && o.isSelected ? o : currOption;
          return o.change;
        })),
        switchMap((optionsChanges: any[]) => merge(...optionsChanges)),
        takeUntil(this.componentDestroyed$)
      ).subscribe((newValue: any) => {
        this.removeSelectedStyleFromOption(this.options, this.selectedValue ? this.selectedValue.optionId : null);
        this.selectedValue = newValue;
        this.change.emit(newValue.option);
        this.onChange(newValue.option);
      });
    this.selectedValue = this.setSelectedStyleToOption(currOption || this.options.first);
    this.cdr.detectChanges();
  }

  public onChange(value: any) { }
  public onTouched() { }

  public registerOnChange(fn: any) { this.onChange = fn; }
  public registerOnTouched(fn: any) { this.onTouched = fn; }
  public writeValue(value: any): void { this.selectedValue = value; }

  // PRIVATE METHODS

  private setSelectedStyleToOption(optionComponent: DropDownOptionComponent): any {
    optionComponent.isSelected = true;
    return {
      option: optionComponent.option,
      optionId: optionComponent.optionId
    };
  }

  private removeSelectedStyleFromOption(options: any, optionId: number): void {
    if (optionId) { options.find(o => o.optionId === optionId).isSelected = false; }
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
