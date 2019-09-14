import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountHomeComponent } from './my-account-home.component';

describe('MyAccountHomeComponent', () => {
  let component: MyAccountHomeComponent;
  let fixture: ComponentFixture<MyAccountHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
