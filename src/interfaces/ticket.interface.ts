export interface Ticket {
  amount: number;
  purchaser: string;
}

export interface DbTicket extends Ticket {
  _id: string;
  code: string;
  purchaseDatetime: Date;
}

export interface TicketDAO {
  create(ticket: Ticket): Promise<DbTicket>;
}
