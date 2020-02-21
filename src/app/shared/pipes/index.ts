
import { DivideByNum } from './divideByNum.pipe';
import { MultiplyByNumPipe } from './multiply-by-num.pipe';
import { TimesPipe } from './times.pipe';

export * from './divideByNum.pipe';
export * from './multiply-by-num.pipe';
export * from './times.pipe';

export const PIPES = [
  DivideByNum,
  MultiplyByNumPipe,
  TimesPipe
];
