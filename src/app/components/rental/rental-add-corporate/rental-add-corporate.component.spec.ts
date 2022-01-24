import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalAddCorporateComponent } from './rental-add-corporate.component';

describe('RentalAddCorporateComponent', () => {
  let component: RentalAddCorporateComponent;
  let fixture: ComponentFixture<RentalAddCorporateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalAddCorporateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalAddCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
