export interface User {
  firstName: string;
  lastName: string;
  birthDate: Date;
  isBankClient: boolean;
}

export interface Ticket {
  id: string;
  user: User;
  isPriority: boolean;
  ticketDate: Date;
}