import { Component, computed, inject } from '@angular/core';
import { QueueService } from '@services/queue-service';
import { DatePipe } from '@angular/common';
import { MATERIAL_MODULES } from '@shared/utils/material-modules';
import { QrService } from '@core/services/qr.service';
import { QrCard } from '@shared/ui/qr-card/qr-card';
import { SidebarLayout } from '@shared/ui/layouts/sidebar-layout/sidebar-layout';

@Component({
  selector: 'app-queue-list',
  standalone: true,
  imports: [
    MATERIAL_MODULES,
    DatePipe,
    QrCard,
    SidebarLayout
  ],
  templateUrl: './queue-list.html',
  styleUrl: './queue-list.scss',
})
export class QueueList {
  public qrService = inject(QrService);
  private readonly ticketService = inject(QueueService);
  waitingList = this.ticketService.waitingList;

  readonly sortedWaitingList = computed(() => {
    return [...this.waitingList()].sort((a, b) =>
      Number(b.isPriority) - Number(a.isPriority)
    );
  });
}
