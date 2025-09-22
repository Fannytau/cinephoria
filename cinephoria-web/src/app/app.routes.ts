import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'films', loadComponent: () => import('./pages/films/films.component').then(m => m.FilmsComponent) },
  { path: 'reservation', loadComponent: () => import('./pages/reservation/reservation.component').then(m => m.ReservationComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: '**', redirectTo: '' }
];
