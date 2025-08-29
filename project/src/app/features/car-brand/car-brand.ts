import { Component, OnInit } from '@angular/core';
import { CarBrandService} from '../../services/car-brand.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




interface CarModel {
  name: string;
  type: string;
}
interface CarBrandData {
  name: string;
  models: CarModel[];
}

@Component({
  selector: 'app-car-brand',
  standalone:true,
  templateUrl: './car-brand.html',
  styleUrls: ['./car-brand.css'],
  imports:[CommonModule, FormsModule]
})


export class CarBrand implements OnInit {
  searchQuery: string = '';
  brands: CarBrandData[] = [];
  models:CarModel[]=[]
  filteredBrands: CarBrandData[] = [];



  constructor(private carBrandService: CarBrandService) {}

  ngOnInit(): void {
    this.carBrandService.getcarBrand().subscribe({
      next: (data) => {
        this.brands = data;
        this.filteredBrands = data;
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
      }
    });
  }


}
