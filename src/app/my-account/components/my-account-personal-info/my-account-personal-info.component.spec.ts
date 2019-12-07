import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountPersonalInfoComponent } from './my-account-personal-info.component';

describe('MyAccountPersonalInfoComponent', () => {
  let component: MyAccountPersonalInfoComponent;
  let fixture: ComponentFixture<MyAccountPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
