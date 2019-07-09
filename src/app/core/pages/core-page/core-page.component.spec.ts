
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';

import { CoreCommonModule } from '@app/common/core-common.module';
import { SharedModule } from '@app/shared/shared.module';

import { CorePageComponent } from './core-page.component';

describe('CorePageComponent', () => {
  let component: CorePageComponent;
  let fixture: ComponentFixture<CorePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        CoreCommonModule,
        SharedModule
      ],
      declarations: [ CorePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
