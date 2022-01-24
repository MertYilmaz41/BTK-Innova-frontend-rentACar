import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalServiceUpdateComponent } from './additional-service-update.component';

describe('AdditionalServiceUpdateComponent', () => {
  let component: AdditionalServiceUpdateComponent;
  let fixture: ComponentFixture<AdditionalServiceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalServiceUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalServiceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
