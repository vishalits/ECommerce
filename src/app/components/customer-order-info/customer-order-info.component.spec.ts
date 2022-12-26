import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderInfoComponent } from './customer-order-info.component';

describe('CustomerOrderInfoComponent', () => {
  let component: CustomerOrderInfoComponent;
  let fixture: ComponentFixture<CustomerOrderInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrderInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerOrderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
