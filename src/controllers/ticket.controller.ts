import { Request, Response } from "express";
import { ticketService } from "../services/services";
import { successStatus, failureStatus } from "../utils/statuses";
import { Ticket } from "../interfaces/ticket.interface";

class CartController {
  constructor() {}

  // @@@@
  async createTicket(req: Request, res: Response) {
    try {
      const ticket: Ticket = req.body;
      await ticketService.createTicket(ticket);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }
}

export default new CartController();
