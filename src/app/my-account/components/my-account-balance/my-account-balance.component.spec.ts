import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountBalanceComponent } from './my-account-balance.component';

describe('MyAccountBalanceComponent', () => {
  let component: MyAccountBalanceComponent;
  let fixture: ComponentFixture<MyAccountBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
