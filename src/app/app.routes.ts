import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'', 
    loadComponent: () => import('./features/qr-display/qr-page').then(m => m.QrPage)
  },
  {
    path:'waiting-list', 
    loadComponent: () => import('./features/queue-list/pages/queue-list.component/queue-list').then(m => m.QueueList)
  },
  {
    path:'booking-form', 
    loadComponent: () => import('./features/booking-form/booking-form').then(m => m.BookingForm)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/dashboard/pages/login.component/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/pages/dashboard.component/dashboard').then(m => m.Dashboard)
  }
];