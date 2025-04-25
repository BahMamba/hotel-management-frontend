import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Page } from '../../models/hotel.model';

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './rooms-list-by-hotel.component.html',
  styleUrl: './rooms-list-by-hotel.component.css'
})
export class RoomsListComponentByHotel implements OnInit {
  rooms: Room[] = [];
  page = 0;
  hotelId: number = 0;
  size = 10;
  totalPages = 1;
  errorMessage: string | null = null;

  constructor(private service: RoomService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.hotelId = id ? +id : 0;
      this.loadRooms();
    });
  }

  loadRooms(): void {
    this.errorMessage = null;
    this.service.getRoomByHotel(this.hotelId, this.page, this.size).subscribe({
      next: (data: Page<Room>) => {
        this.rooms = data.content;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.rooms = [];
      }
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadRooms();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadRooms();
    }
  }
}