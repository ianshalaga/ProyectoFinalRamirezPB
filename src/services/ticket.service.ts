import TicketMongodbDAO from "../dao/mongodb/ticket.mongodb.dao";
import { Ticket } from "../interfaces/ticket.interface";

export default class TicketService {
  dao: TicketMongodbDAO;

  constructor(dao: TicketMongodbDAO) {
    this.dao = dao;
  }

  async createTicket(ticket: Ticket) {
    return await this.dao.create(ticket);
  }
}
