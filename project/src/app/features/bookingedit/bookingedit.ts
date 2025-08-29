import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking';
import { CarBrandService } from '../../services/car-brand.service';
import { CarTypeService } from '../../services/car-type.service';

interface CarModel {
  name: string;
  type: string;
}

interface CarBrandData {
  name: string;
  models: CarModel[];
}

@Component({
  selector: 'app-edit-booking',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './bookingedit.html',
  styleUrls: ['./bookingedit.css']
})
export class Bookingedit implements OnInit {
  updateFormGroup!: FormGroup;
  bookingId!: string;
  loading = true;

  brands: CarBrandData[] = [];
  models: CarModel[] = [];

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private carBrandService: CarBrandService,
    private carTypeService: CarTypeService
  ) {
    this.updateFormGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)]],
      carBrand: ['', Validators.required],
      carModel: ['', Validators.required], // will store model name (string)
      city: ['', Validators.required],
      type: ['', Validators.required],     // auto-filled from model type
      registrationNo: ['', Validators.required],
      serviceType: ['', Validators.required],
      pickUpDate: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('Route bookingId:', this.bookingId);

    this.loadCarBrands();

    // 🔁 Listen to brand change → update model list
    this.updateFormGroup.get('carBrand')?.valueChanges.subscribe((brandName: string) => {
      const selectedBrand = this.brands.find(b => b.name === brandName);
      this.models = selectedBrand ? selectedBrand.models : [];
      this.updateFormGroup.get('carModel')?.reset();
      this.updateFormGroup.get('type')?.reset();
    });

    // 🔁 Listen to model change → auto-fill type
    this.updateFormGroup.get('carModel')?.valueChanges.subscribe((modelName: string) => {
      const selectedModel = this.models.find(m => m.name === modelName);
      if (selectedModel) {
        this.updateFormGroup.get('type')?.setValue(selectedModel.type);
      }
    });

    if (this.bookingId) {
      this.loadBooking();
    }
  }

  private loadCarBrands(): void {
    this.carBrandService.getcarBrand().subscribe({
      next: (brands) => {
        this.brands = brands;
        console.log('Brands loaded:', this.brands);

        // ✅ If booking already loaded and brand exists, reload models
        if (this.updateFormGroup.get('carBrand')?.value) {
          const selectedBrand = this.brands.find(b => b.name === this.updateFormGroup.get('carBrand')?.value);
          this.models = selectedBrand ? selectedBrand.models : [];
        }
      },
      error: (err) => console.error('Error loading brands:', err)
    });
  }

  private loadBooking(): void {
    this.bookingService.getClientById(this.bookingId).subscribe({
      next: (client) => {
        console.log('API Response:', client);

        this.updateFormGroup.patchValue({
          name: client.name,
          email: client.email,
          phone: client.phone,
          carBrand: client.carBrand,
          carModel: client.carModel,
          city: client.city,
          type: client.type,
          registrationNo: client.registrationNo,
          serviceType: client.serviceType,
          pickUpDate: client.pickUpDate?.split('T')[0] ?? '',
          status: client.status
        });

        // ✅ Preload models for the selected brand
        const selectedBrand = this.brands.find(b => b.name === client.carBrand);
        this.models = selectedBrand ? selectedBrand.models : [];

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading booking:', err);
        alert('Could not load booking details ❌');
        this.loading = false;
      }
    });
  }

  onUpdate(): void {
    if (this.updateFormGroup.valid) {
      const updatedClient = { ...this.updateFormGroup.getRawValue() };

      this.bookingService.updateClient(this.bookingId, updatedClient).subscribe({
        next: () => {
          alert('Client booking updated successfully ✅');
          this.router.navigate(['/booking']);
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert('Something went wrong while updating client ❌');
        }
      });
    } else {
      this.updateFormGroup.markAllAsTouched();
      alert('Please fix the errors before submitting.');
    }
  }
}
