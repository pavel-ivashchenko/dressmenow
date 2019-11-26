import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { SharedModule } from '@app/shared/shared.module';
import { CurrencyEffects } from '@app/core/store/effects';
import { appReducers } from '@app/core/store/reducers';

import { CartModalComponent } from './cart-modal.component';

xdescribe('CartModalComponent', () => {
  // let component: CartModalComponent;
  // let fixture: ComponentFixture<CartModalComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [
  //       HttpClientModule,
  //       StoreModule.forRoot(appReducers),
  //       EffectsModule.forRoot([ CurrencyEffects ]),
  //       SharedModule
  //     ],
  //     declarations: [ CartModalComponent ],
  //     providers: [
  //       { provide: MAT_DIALOG_DATA, useValue: {} }, // TODO investigate
  //       { provide: MatDialogRef, useValue: {} } // TODO investigate
  //     ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(CartModalComponent);
  //   fixture.debugElement.injector.get(MAT_DIALOG_DATA);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
