import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking';
import { CarBrandService } from '../../services/car-brand.service';
// import { CarTypeService } from '../../services/car-type.service';



interface CarModel {
  name: string;
  type: string;
}
interface CarBrandData {
  name: string;
  models: CarModel[];
}


@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './booking-form.html',
  styleUrls: ['./booking-form.css']
})
export class BookingForm implements OnInit {
  public formGroup: FormGroup;
  public brands: CarBrandData[] = [];
  public models: CarModel[] = [];
  // public CarType :CarTypeData[]=[];
  today: string = new Date().toISOString().split('T')[0];


  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private carBrandService: CarBrandService
    // private  carTypeServise:CarTypeService
  ) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      carBrand: ['', [Validators.required]],
      carModel: [null, [Validators.required]],
      type: [{ value: '', disabled: true }, [Validators.required]],
      city: ['', [Validators.required]],

      registrationNo: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(4)]
      ],
      serviceType: ['', [Validators.required]],
      pickUpDate: ['', [Validators.required]],
      status: ['']
    });
  }

  ngOnInit(): void {
    // ✅ Fetch all brands on init
    this.carBrandService.getcarBrand().subscribe({
      next: (res: CarBrandData[]) => {
        this.brands = res;
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
      }
    });


    // ✅ When brand changes, update models dropdown
    this.formGroup.get('carBrand')?.valueChanges.subscribe((brandName: string) => {
      const selectedBrand = this.brands.find((b) => b.name === brandName);
      this.models = selectedBrand ? selectedBrand.models : [];
      this.formGroup.patchValue({ carModel: '', type: '' }) // clear previous model
    });


    // fetch all brands on init
    //       this.carTypeServise.getcarType().subscribe({
    //     next:(res:CarTypeData[])=>{
    // this.CarType= res;
    //     },
    //     error:(err)=>{
    //       console.error('Error fetching carType:', err)
    //     }
    //   })


    // when model changes auto Filled its type
    this.formGroup.get('carModel')?.valueChanges.subscribe((modelName: string) => {
      const brand = this.brands.find(b => b.name === this.formGroup.get('carBrand')?.value);
      const selectedModel = brand?.models.find(m => m.name === modelName);
      if (selectedModel) {
        this.formGroup.patchValue({ type: selectedModel.type });
      }
    });


  }

  updateStatus(client: any) {
    this.bookingService.updateClient(client._id, { status: client.status }).subscribe({
      next: (updated) => {
        console.log('Status updated:', updated);
      },
      error: (err) => {
        console.error('Error updating status:', err);
      }
    });
  }


  public onSubmit() {
    if (this.formGroup.valid) {
      this.bookingService.createClient(this.formGroup.value).subscribe({
        next: (res) => {
          alert('User created successfully');
          this.formGroup.reset();
        },
        error: (err) => alert('Error occurred: ' + (err.message || err))
      });
    } else {
      this.formGroup.markAllAsTouched();
      alert('Please fill all required fields correctly.');
    }
  }

}
