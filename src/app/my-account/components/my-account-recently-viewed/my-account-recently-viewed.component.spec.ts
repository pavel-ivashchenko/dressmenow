import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountRecentlyViewedComponent } from './my-account-recently-viewed.component';

describe('MyAccountRecentlyViewedComponent', () => {
  let component: MyAccountRecentlyViewedComponent;
  let fixture: ComponentFixture<MyAccountRecentlyViewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountRecentlyViewedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountRecentlyViewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
