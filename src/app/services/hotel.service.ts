import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel, Page } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private baseUrl = 'http://localhost:8080/api/hotels';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getHotels(city: string = '', page: number = 0, size: number = 10): Observable<Page<Hotel>> {
    let params = new HttpParams()
      .set('city', city.toString())
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Hotel>>(this.baseUrl, { headers: this.getAuthHeaders(), params });
  }

  getHotelsByAdmin(page: number = 0, size: number = 10): Observable<Page<Hotel>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Hotel>>(`${this.baseUrl}/admin`, { headers: this.getAuthHeaders(), params });
  }

  getHotel(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  addHotel(hotel: Partial<Hotel>): Observable<Hotel> {
    return this.http.post<Hotel>(this.baseUrl, hotel, { headers: this.getAuthHeaders() });
  }

  updateHotel(id: number, hotel: Partial<Hotel>): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.baseUrl}/${id}`, hotel, { headers: this.getAuthHeaders() });
  }

  deleteHotel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}