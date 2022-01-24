import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalServiceAddComponent } from './additional-service-add.component';

describe('AdditionalServiceAddComponent', () => {
  let component: AdditionalServiceAddComponent;
  let fixture: ComponentFixture<AdditionalServiceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalServiceAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalServiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
