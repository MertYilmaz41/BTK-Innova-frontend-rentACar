import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodeAddComponent } from './promo-code-add.component';

describe('PromoCodeAddComponent', () => {
  let component: PromoCodeAddComponent;
  let fixture: ComponentFixture<PromoCodeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoCodeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoCodeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
