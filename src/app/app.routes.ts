import { Routes } from '@angular/router';

export const routes: Routes = [
  // Route vers le composant d'authentification
  {
    path: 'auth',
    loadComponent: () =>
      import('./authentification/authentification.component').then(m => m.AuthComponent),
  },

  // Section hôtels
  {
    path: 'hotels',
    children: [
      // Page liste d’hôtels
      {
        path: '',
        loadComponent: () =>
          import('./hotels/hotel-list/hotel-list.component').then(m => m.HotelListComponent),
      },

      // Espace admin
      {
        path: 'admin-space',
        loadComponent: () =>
          import('./hotels/hotelmanagement/hotelmanagement.component').then(m => m.HotelmanagementComponent),
      },

      // Route pour ajouter un hôtel
      {
        path: 'hotel/new',
        loadComponent: () =>
          import('./hotels/hotel-form/hotel-form.component').then(m => m.HotelFormComponent),
      },

      // Route pour modifier un hôtel
      {
        path: 'hotel/edit/:id',
        loadComponent: () =>
          import('./hotels/hotel-form/hotel-form.component').then(m => m.HotelFormComponent),
      }
    ]
  },

  // Redirections par défaut
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth' }
];