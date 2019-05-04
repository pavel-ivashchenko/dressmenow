
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CurrencyEffects } from './store/effects/currency.effects'; // TODO start from here
import { coreModuleState, coreModuleStateToken, metaReducers } from './store/reducers';

@NgModule({
  imports: [
    StoreModule.forRoot(coreModuleStateToken, { metaReducers }),
    EffectsModule.forRoot(CurrencyEffects)
  ],
  providers: [{
    provide: coreModuleStateToken,
    useValue: coreModuleState
  }]
})
export class CoreModule {
}
