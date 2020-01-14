
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { ShopRoutingModule } from '@app/shop/shop-routing.module';

import { ShopComponent, ShoesComponent} from './pages';
import { ShowcaseComponent } from './components';

@NgModule({
  declarations: [
    ShopComponent,
    ShowcaseComponent,
    ShoesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
