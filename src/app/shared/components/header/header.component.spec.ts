
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared/shared.module';
import { CurrencyEffects } from '@app/core/store/effects';
import { appReducers } from '@app/core/store/reducers';

import { HeaderComponent } from './header.component';

xdescribe('HeaderComponent', () => {
  // let component: HeaderComponent;
  // let fixture: ComponentFixture<HeaderComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [
  //       HttpClientModule,
  //       BrowserAnimationsModule,
  //       StoreModule.forRoot(appReducers),
  //       EffectsModule.forRoot([ CurrencyEffects ]),
  //       SharedModule,
  //     ],
  //     declarations: [ HeaderComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(HeaderComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
