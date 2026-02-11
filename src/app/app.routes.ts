import { Routes } from '@angular/router';
import { QrPage } from './features/qr-display/pages/qr-page/qr-page';
import { QueueList } from '@features/queue-list/queue-list';

export const routes: Routes = [
  {path:'', component: QrPage},
  {path:'waiting-list', component: QueueList}
];
