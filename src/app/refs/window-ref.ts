
import { Inject, Injectable, InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Window');

@Injectable()
export class WindowRef {

  constructor(@Inject(WINDOW) private _win: Window) { }

  get nativeWindow(): Window {
    if (!this._win) { throw new Error('window is not declared'); }
    return this._win;
  }

}
