
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule, MatDialogModule, MatButtonModule, MatSnackBarModule } from '@angular/material';

import { AppRoutingModule } from '@app/app-routing.module';
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
    HttpClientModule,
    MatSelectModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [],
  entryComponents: [
    CartModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
