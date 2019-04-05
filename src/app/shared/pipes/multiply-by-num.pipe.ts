
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiplyByNum'
})
export class MultiplyByNumPipe implements PipeTransform {
  transform(value: number | string, num: number): number {
    return +value * num;
  }
}
