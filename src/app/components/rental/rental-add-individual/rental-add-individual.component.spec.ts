import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalAddIndividualComponent } from './rental-add-individual.component';

describe('RentalAddIndividualComponent', () => {
  let component: RentalAddIndividualComponent;
  let fixture: ComponentFixture<RentalAddIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalAddIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalAddIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
