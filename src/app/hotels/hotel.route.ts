import { Routes } from "@angular/router";
import { HotelListComponent } from "./hotel-list/hotel-list.component";
import { HotelFormComponent } from "./hotel-form/hotel-form.component";
import { RoomsListComponentByHotel } from "../rooms/rooms-list-by-hotel/rooms-list-by-hotel.component";

export const hotelRoutes: Routes = [
    { path: '', component: HotelListComponent },
    { path: 'new', component: HotelFormComponent },
    { path: 'edit/:id', component: HotelFormComponent},
    { path: ':id/rooms', component: RoomsListComponentByHotel},
]