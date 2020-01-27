import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownOptionsComponent } from './drop-down-options.component';

describe('DropDownOptionsComponent', () => {
  let component: DropDownOptionsComponent;
  let fixture: ComponentFixture<DropDownOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
