import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarType } from './car-type';

describe('CarType', () => {
  let component: CarType;
  let fixture: ComponentFixture<CarType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
