import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCardDetailComponent } from './customer-card-detail.component';

describe('CustomerCardDetailComponent', () => {
  let component: CustomerCardDetailComponent;
  let fixture: ComponentFixture<CustomerCardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCardDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
