
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CurrencyEffects } from '@app/core/store/effects';
import { appReducers } from '@app/core/store/reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ CurrencyEffects ])
  ],
  declarations: []
})
export class CoreStoreModule {}
