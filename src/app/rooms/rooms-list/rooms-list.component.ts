import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';
import { Page } from '../../models/hotel.model';

@Component({
  selector: 'app-rooms-list',
  imports: [CommonModule],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.css'
})
export class RoomsListComponent implements OnInit {
  rooms: Room[] = [];
  page = 0 ;
  size = 10;
  totalPages = 1;
  errorMessage: string | null = null;

  constructor(private service: RoomService){};
  
  ngOnInit(): void {
    this.loadRooms()
  }
;

  loadRooms():void{
    this.service.getAllRooms(this.page, this.size).subscribe({
      next: (data: Page<Room>) => {
        this.rooms = data.content;
        this.totalPages = data.totalPages
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
