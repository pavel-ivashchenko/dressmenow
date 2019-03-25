
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'divideByNum'})
export class DivideByNum implements PipeTransform {
  transform(value: number | string, num: number): number {
    return +value / num;
  }
}
