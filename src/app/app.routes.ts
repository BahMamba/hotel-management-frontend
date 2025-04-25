import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'hotels',
    loadChildren: () => import('./hotels/hotel.route').then(m => m.hotelRoutes)
  },

  {
    path: 'rooms', 
    loadChildren: () => import('./rooms/rooms.routes').then(m => m.roomsRoute)
  },
  { path: '', redirectTo: '/hotels', pathMatch: 'full' }
];