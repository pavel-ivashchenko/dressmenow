import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallDropdownComponent } from './small-dropdown.component';

describe('SmallDropdownComponent', () => {
  let component: SmallDropdownComponent;
  let fixture: ComponentFixture<SmallDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
