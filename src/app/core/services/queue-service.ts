import { Injectable, signal, Signal } from '@angular/core';
import { Ticket, User } from '../models/queue.models';
import { queueMockups } from './service-mockups/queue.mockups';


@Injectable({
  providedIn: 'root',
})

export class QueueService {
  private readonly _tickets = signal<Ticket[]>(this.buildMockTickets());

  readonly waitingList: Signal<Ticket[]> = this._tickets.asReadonly();

  private buildMockTickets(): Ticket[] {
    return queueMockups
  }

  addTicketList(user: User, isPriority: boolean): void {
    const newTicket: Ticket = {
      id: this.generateId(),
      user,
      isPriority,
      ticketDate: new Date(),
    };
    this._tickets.update((currentTickets) => [...currentTickets, newTicket]);
  }

  private generateId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}
