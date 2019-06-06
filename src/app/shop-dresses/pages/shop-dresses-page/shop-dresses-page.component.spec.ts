import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDressesPageComponent } from './shop-dresses-page.component';

describe('ShopDressesPageComponent', () => {
  let component: ShopDressesPageComponent;
  let fixture: ComponentFixture<ShopDressesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDressesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDressesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
