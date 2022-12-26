import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSectionComponent } from './cart-section.component';

describe('CartSectionComponent', () => {
  let component: CartSectionComponent;
  let fixture: ComponentFixture<CartSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
