import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountOrdersComponent } from './my-account-orders.component';

describe('MyAccountOrdersComponent', () => {
  let component: MyAccountOrdersComponent;
  let fixture: ComponentFixture<MyAccountOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
