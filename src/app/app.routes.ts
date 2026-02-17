import { Routes } from '@angular/router';
import { QrPage } from './features/qr-display/qr-page';
import { QueueList } from '@features/queue-list/queue-list';
import { BookingForm } from '@features/booking-form/booking-form';
import { Dashboard } from '@features/dashboard/dashboard';

export const routes: Routes = [
  {path:'', component: QrPage},
  {path:'waiting-list', component: QueueList},
  {path:'booking-form', component: BookingForm},
{
    path: 'admin',
    component: Dashboard,
    /** For demonstration purposes, we are loading the dashboard component directly.
    children: [
      {
        path: 'waiting-list',
        loadComponent: () => import('./features/waiting-list/waiting-list.component').then(m => m.WaitingListComponent)
      },
      {
        path: 'stats',
        loadComponent: () => import('./features/stats/stats.component').then(m => m.StatsComponent)
      }
    ]
      */
  },

];
