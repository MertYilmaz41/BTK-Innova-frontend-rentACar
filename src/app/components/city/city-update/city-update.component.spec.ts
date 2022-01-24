import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityUpdateComponent } from './city-update.component';

describe('CityUpdateComponent', () => {
  let component: CityUpdateComponent;
  let fixture: ComponentFixture<CityUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
