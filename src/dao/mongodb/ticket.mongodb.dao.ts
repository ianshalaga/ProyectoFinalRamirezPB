/** Model */
import ticketsModel from "./models/ticket.mongodb.model";
/** Interfaces */
import { TicketDAO, Ticket, DbTicket } from "../../interfaces/ticket.interface";

class TicketMongodbDAO implements TicketDAO {
  constructor() {}

  // @@@@
  async create(ticket: Ticket): Promise<DbTicket> {
    try {
      const dbTicket: DbTicket = (await ticketsModel.create(ticket)).toObject();
      return dbTicket;
    } catch (error) {
      throw error;
    }
  }
}

export default TicketMongodbDAO;
