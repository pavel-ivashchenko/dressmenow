
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from '@app/core/core-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { CoreStoreModule } from './store/core-store.module';

import { APP_SERVICE_PROVIDERS } from './services';
import { APP_INTERCEPTORS } from './interceptors';

import { CorePageComponent } from './pages/core-page/core-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    CorePageComponent,
    NotFoundPageComponent
  ],
  providers: [
    ...APP_SERVICE_PROVIDERS,
    ...APP_INTERCEPTORS
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    CoreStoreModule,
    SharedModule
  ],
  exports: [
    CoreRoutingModule
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
