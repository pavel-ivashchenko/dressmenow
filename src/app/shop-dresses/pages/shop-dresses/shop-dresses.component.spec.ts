import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDressesComponent } from './shop-dresses.component';

describe('ShopDressesComponent', () => {
  let component: ShopDressesComponent;
  let fixture: ComponentFixture<ShopDressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDressesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
