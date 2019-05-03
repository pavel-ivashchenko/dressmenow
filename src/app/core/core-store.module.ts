
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModuleEffects } from './store/effects';
import { coreModuleState, coreModuleStateToken, metaReducers } from './store/reducers';

@NgModule({
  imports: [
    StoreModule.forRoot(coreModuleStateToken, { metaReducers }),
    EffectsModule.forRoot(CoreModuleEffects)
  ],
  providers: [{
    provide: coreModuleStateToken,
    useValue: coreModuleState
  }]
})
export class CoreModule {
}
