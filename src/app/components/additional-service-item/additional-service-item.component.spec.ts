import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalServiceItemComponent } from './additional-service-item.component';

describe('AdditionalServiceItemComponent', () => {
  let component: AdditionalServiceItemComponent;
  let fixture: ComponentFixture<AdditionalServiceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalServiceItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalServiceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
