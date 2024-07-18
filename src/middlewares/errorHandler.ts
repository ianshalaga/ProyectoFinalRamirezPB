import { Request, Response, NextFunction } from "express";
import { CustomError } from "../interfaces/error.interface";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    const customError = err as CustomError;
    if (customError.code) {
      req.logger.error(customError.name + ": " + customError.description);
      res.setHeader("Content-Type", "application/json");
      return res.status(customError.code).json({ error: customError.message });
    } else {
      res.setHeader("Content-Type", "application/json");
      return res.status(500).json({ error: "Unexpected error" });
    }
  }
  next();
}
