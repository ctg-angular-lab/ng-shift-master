import { Component, inject } from '@angular/core';
import { QueueService } from '@services/queue-service';
import { MATERIAL_MODULES } from '@shared/utils/material-modules';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-queue-list',
  standalone: true,
  imports: [
    MATERIAL_MODULES,
    DatePipe
  ],
  templateUrl: './queue-list.html',
  styleUrl: './queue-list.scss',
})
export class QueueList {
private readonly ticketService = inject(QueueService);
waitingList = this.ticketService.waitingList;
}
