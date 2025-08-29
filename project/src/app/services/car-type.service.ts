import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarTypeService {
       private http = inject(HttpClient)
  private carTypeUrl = 'http://localhost:3000/carType';
  getcarType(): Observable<any> {
    return this.http.get(this.carTypeUrl);
  }
}
