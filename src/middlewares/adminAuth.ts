import { Request, Response, NextFunction } from "express";
import { successStatus } from "../utils/statuses";
import config from "../config/env.config";

function adminAuth(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (email === config.adminEmail && password == config.adminPassword) {
    req.session.admin = {
      email: email,
      rol: "admin",
    };
    return res.status(200).json(successStatus);
  }
  next();
}

export default adminAuth;
