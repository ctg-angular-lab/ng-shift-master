import { Injectable, signal, Signal } from '@angular/core';
import { Ticket, User } from '../models/queue.models';


@Injectable({
  providedIn: 'root',
})

export class QueueService {
  private readonly _tickets = signal<Ticket[]>(this.buildMockTickets());

  readonly waitingList: Signal<Ticket[]> = this._tickets.asReadonly();

  private buildMockTickets(): Ticket[] {
    return [
      {
        id: this.generateId(),
        isPriority: true,
        ticketDate: new Date('2025-01-10T10:30:00'),
        user: {
          firstName: 'Camilo',
          lastName: 'Tabares',
          birthDate: new Date('1992-05-18'),
          isBankClient: true,
        },
      },
      {
        id: this.generateId(),
        isPriority: false,
        ticketDate: new Date('2025-01-11T09:15:00'),
        user: {
          firstName: 'Laura',
          lastName: 'Gomez',
          birthDate: new Date('1996-08-02'),
          isBankClient: false,
        },
      },
      {
        id: this.generateId(),
        isPriority: true,
        ticketDate: new Date('2025-01-12T14:00:00'),
        user: {
          firstName: 'Andres',
          lastName: 'Ramirez',
          birthDate: new Date('1988-12-20'),
          isBankClient: true,
        },
      },
      {
        id: this.generateId(),
        isPriority: false,
        ticketDate: new Date('2025-01-13T16:45:00'),
        user: {
          firstName: 'Sofia',
          lastName: 'Martinez',
          birthDate: new Date('2000-03-11'),
          isBankClient: true,
        },
      },
    ];
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
