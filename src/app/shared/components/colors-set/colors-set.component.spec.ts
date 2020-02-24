import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsSetComponent } from './colors-set.component';

describe('ColorsSetComponent', () => {
  let component: ColorsSetComponent;
  let fixture: ComponentFixture<ColorsSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorsSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
