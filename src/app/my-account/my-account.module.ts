
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';

import { MyAccountComponent, MyAccountHomeComponent } from './pages';

@NgModule({
  declarations: [
    MyAccountComponent,
    MyAccountHomeComponent
  ],
  imports: [
    CommonModule,
    MyAccountRoutingModule
  ]
})
export class MyAccountModule { }
