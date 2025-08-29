import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarTypeService } from '../../services/car-type.service';
import { RouterLink } from'@angular/router';

interface CarTypes {
  name: string;
}
@Component({
  selector: 'app-car-type',
  standalone:true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './car-type.html',
  styleUrl: './car-type.css'
})
export class CarType  implements OnInit {
 searchQuery: string='';
 types:CarTypes[]=[];
 filteredCarTypes: CarTypes[]=[];


 constructor (private carTypeService: CarTypeService  ){}


 ngOnInit(): void {
      this.carTypeService.getcarType().subscribe({
next:(data)=>{
  this.types= data;
  this.filteredCarTypes= data;
},
error:(err)=>{
  console.log('Error fetching types', err)
}
      })
 }

 onsearch(){
  const q = this.searchQuery.toLowerCase();
  this.filteredCarTypes=  this.types.filter(
    t=>
      t.name.toLowerCase().includes(q)
)
 }
}
