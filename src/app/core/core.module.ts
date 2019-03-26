
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_SERVICE_PROVIDERS } from './services';
import { APP_INTERCEPTORS } from './interceptors';

@NgModule({
  declarations: [],
  providers: [
    ...APP_SERVICE_PROVIDERS,
    ...APP_INTERCEPTORS
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
