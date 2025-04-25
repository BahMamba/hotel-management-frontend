import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/hotel.model';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = 'http://localhost:8080/api/rooms';
  constructor(private http: HttpClient) { }

  getRoomByHotel(hotelId: number, page: number = 0, size: number = 10): Observable<Page<Room>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Room>>(`${this.baseUrl}/by-hotel/${hotelId}`, { params });
  }

  getAllRooms(page: number = 0, size: number = 10): Observable<Page<Room>>{
    let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
    return this.http.get<Page<Room>>(this.baseUrl, {params});
  }
}
