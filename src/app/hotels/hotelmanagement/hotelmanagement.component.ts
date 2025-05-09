import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Hotel, Page } from '../../models/hotel.model';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-hotel-management',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hotelmanagement.component.html',
  styles: []
})
export class HotelmanagementComponent implements OnInit {
  hotels: Hotel[] = [];
  page: Page<Hotel> = { _embedded: { hotelList: [] }, page: { size: 0, totalElements: 0, totalPages: 0, number: 0 } };
  currentPage: number = 0;
  pageSize: number = 10;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  hotelToDelete: number | null = null;

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.errorMessage = null;
    this.hotelService.getHotelsByAdmin(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.page = data;
        this.hotels = data._embedded.hotelList;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des hôtels : ' + (err.message || 'Veuillez réessayer.');
      }
    });
  }

  confirmDelete(id: number): void {
    this.hotelToDelete = id;
  }

  deleteHotel(): void {
    if (this.hotelToDelete) {
      this.hotelService.deleteHotel(this.hotelToDelete).subscribe({
        next: () => {
          this.successMessage = 'Hôtel supprimé avec succès !';
          this.hotelToDelete = null;
          this.loadHotels();
          setTimeout(() => this.successMessage = null, 3000);
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la suppression : ' + (err.message || 'Veuillez réessayer.');
        }
      });
    }
  }

  cancelDelete(): void {
    this.hotelToDelete = null;
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.page.page.totalPages) {
      this.currentPage = page;
      this.loadHotels();
    }
  }
}