import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodeUpdateComponent } from './promo-code-update.component';

describe('PromoCodeUpdateComponent', () => {
  let component: PromoCodeUpdateComponent;
  let fixture: ComponentFixture<PromoCodeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoCodeUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoCodeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
