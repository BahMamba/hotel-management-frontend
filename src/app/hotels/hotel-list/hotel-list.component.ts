import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel, Page } from '../../models/hotel.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.css'
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  page: Page<Hotel> = { _embedded: { hotelList: [] }, page: { size: 0, totalElements: 0, totalPages: 0, number: 0 } };
  currentPage: number = 0;
  pageSize: number = 10;
  cityFilter: string = '';

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.hotelService.getHotels(this.cityFilter, this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.page = data;
        this.hotels = data._embedded.hotelList;
      },
      error: (err) => console.error('Error loading hotels:', err)
    });
  }

  onCityFilterChange(): void {
    this.currentPage = 0;
    this.loadHotels();
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.page.page.totalPages) {
      this.currentPage = page;
      this.loadHotels();
    }
  }
}