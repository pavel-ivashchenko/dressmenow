import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsSetComponent } from './stars-set.component';

describe('StarsSetComponent', () => {
  let component: StarsSetComponent;
  let fixture: ComponentFixture<StarsSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarsSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
