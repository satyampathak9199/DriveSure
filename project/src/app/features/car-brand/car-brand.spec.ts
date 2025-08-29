import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarBrandService } from '../../services/car-brand.service';

describe('CarBrand', () => {
  let component: CarBrandService;
  let fixture: ComponentFixture<CarBrandService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarBrandService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarBrandService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
