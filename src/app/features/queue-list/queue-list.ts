import { Component, inject } from '@angular/core';
import { QueueService } from '@services/queue-service';

@Component({
  selector: 'app-queue-list',
  standalone: true,
  imports: [],
  templateUrl: './queue-list.html',
  styleUrl: './queue-list.scss',
})
export class QueueList {
private readonly ticketService = inject(QueueService);
waitingList = this.ticketService.waitingList;
}
