// import { Component, NgModule } from '@angular/core';
// import { FormControl, FormControlName, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { inject, OnInit } from '@angular/core';
// @Component({
//   selector: 'app-reports',
//   imports: [ReactiveFormsModule, FormsModule, CommonModule],
//   templateUrl: './reports.html',
//   styleUrl: './reports.css'
// })
//  export class Reports implements OnInit {

//   http= inject(HttpClient);
//   ngOnInit():void {
//     this.clientObj();
//   }


//   clientObj:any={
//     "clientId":0,
//     "email": "",
//     "phone": "",
//     "carBrand": "",
//     "carModel": "",
//     "type": "",
//     "number": "",
//     "service": "",
//     "city": "",
//     "regNo": ""
//   };
//  submitForm() {
//    console.log(this.clientObj);
//   this.http.post('http://localhost:3000/bookings', this.clientObj).subscribe({
// next:(res)=>{
// alert("user created ")
// },
// error:(error)=>{
//   alert("we got this err")
// }
//   })

//  }
// }import { Component, OnInit, inject } from '@angular/core';
import { BookingService } from '../../services/booking';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { OnInit,inject } from '@angular/core';
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ],
  templateUrl: './reports.html',
  styleUrls: ['./reports.css']
})
export class Reports implements OnInit {
  private bookingService = inject(BookingService);

  clientObj: any = {
    clientId: 0,
    "email": '',
    "phone": '',
    "carBrand": '',
    "carModel": '',
    "type": '',
    "number": '',
    "serviceType": '',
    "city": '',
    "registrationNo": ''
  };

  ngOnInit(): void {
    this.clientObj;
  }

  submitForm() {
    console.log(this.clientObj);
    this.bookingService.createClient(this.clientObj).subscribe({
      next: () => alert('User created'),
      error: (err) => alert('Error occurred: ' + err)
    });
  }
}


