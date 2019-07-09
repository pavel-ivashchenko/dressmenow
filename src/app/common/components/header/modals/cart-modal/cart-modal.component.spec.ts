import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared/shared.module';
import { CurrencyEffects } from '@app/core/store/effects';
import { appReducers } from '@app/core/store/reducers';

import { CartModalComponent } from './cart-modal.component';

describe('CartModalComponent', () => {
  let component: CartModalComponent;
  let fixture: ComponentFixture<CartModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([ CurrencyEffects ])
      ],
      declarations: [ CartModalComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }, // TODO investigate
        { provide: MatDialogRef, useValue: {} } // TODO investigate
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartModalComponent);
    fixture.debugElement.injector.get(MAT_DIALOG_DATA);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
