
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { CoreCommonModule } from '@app/common/core-common.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    CoreCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
