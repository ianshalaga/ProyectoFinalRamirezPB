import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
const addLogger = (req: Request, res: Response, next: NextFunction) => {
  req.logger = logger;
  next();
};

export default addLogger;
