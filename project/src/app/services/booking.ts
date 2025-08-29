

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/bookings';

  // Get all bookings
  getClients(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Get a booking by ID (needed for editing)
  getClientById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Create new booking
  createClient(clientData: any): Observable<any> {
    return this.http.post(this.baseUrl, clientData);
  }
  onSubmit(clientData:any):Observable<any>{
    return this.http.post(this.baseUrl, clientData)
  }
  // Update booking by ID


  updateClient(id: string, updatedData: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}`, updatedData);
}

  // Delete booking by ID
  deleteClient(id: string): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`);
}
}
