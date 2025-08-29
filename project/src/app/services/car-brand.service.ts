import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarBrandService {
   private http = inject(HttpClient)
  private carUrl = 'http://localhost:3000/CarBrand';

  // get all Car Brand
  getcarBrand(): Observable<any> {
    return this.http.get(this.carUrl);
  }


//  getCarBrandById(id:string):Observable<any>{
//   return this.http.get(`${this.carUrl}/${id}`);
//  }

//    // Create new booking
//   createCarBrand(carBrandData: any): Observable<any> {
//     return this.http.post(this.carUrl, carBrandData);
//   }
//   onSubmit(carBrandData:any):Observable<any>{
//     return this.http.post(this.carUrl, carBrandData)
//   }
//   // Update booking by ID


//   updateCarBrand(id: string, updateBrand: any): Observable<any> {
//   return this.http.put(`${this.carUrl}/${id}`, updateBrand);
// }

//   // Delete booking by ID
//   deleteCarBrand(id: string): Observable<any> {
//   return this.http.delete(`${this.carUrl}/${id}`);
// }

}
