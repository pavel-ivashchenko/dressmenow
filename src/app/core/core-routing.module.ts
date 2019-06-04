
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { CORE_ROUTES } from './constants/core-routes';

@NgModule({
  imports: [
    RouterModule.forRoot(
      CORE_ROUTES,
      { preloadingStrategy: PreloadAllModules }
    )
  ],
  providers: [],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
