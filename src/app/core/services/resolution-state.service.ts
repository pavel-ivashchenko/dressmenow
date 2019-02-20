
import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationStateService {

  private isMobileResolution: boolean;

  // TODO start from here

  constructor() {
    if (window.innerWidth < 768) {
    this.isMobileResolution = true;
    } else {
    this.isMobileResolution = false;
    }
  }

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }

}
