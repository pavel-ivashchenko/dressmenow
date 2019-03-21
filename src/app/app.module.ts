
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatDialogModule, MatButtonModule } from '@angular/material';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CartModalComponent } from './header/modals/cart-modal/cart-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    CoreModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  entryComponents: [
    CartModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
