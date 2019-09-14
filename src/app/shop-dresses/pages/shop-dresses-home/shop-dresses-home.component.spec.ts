import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDressesHomeComponent } from './shop-dresses-home.component';

describe('ShopDressesHomeComponent', () => {
  let component: ShopDressesHomeComponent;
  let fixture: ComponentFixture<ShopDressesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDressesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDressesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
