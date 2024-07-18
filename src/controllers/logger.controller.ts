import { Request, Response } from "express";
import { failureStatus } from "../utils/statuses";

class LoggerController {
  constructor() {}

  async loggerTest(req: Request, res: Response) {
    try {
      req.logger.debug("Debug log");
      req.logger.http("HTTP log");
      req.logger.info("Info log");
      req.logger.warning("Warning log");
      req.logger.error("Error log");
      req.logger.fatal("Fatal log");
      res.send("Logs creados.");
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }
}

export default new LoggerController();
