import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountInfoBlockComponent } from './my-account-info-block.component';

describe('MyAccountInfoBlockComponent', () => {
  let component: MyAccountInfoBlockComponent;
  let fixture: ComponentFixture<MyAccountInfoBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountInfoBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountInfoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
