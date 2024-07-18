import { User } from "../src/interfaces/user.interface";
import { CustomLogger } from "../src/types/logger.type";

declare module "express-serve-static-core" {
  interface Request {
    customUser?: User;
    logger: CustomLogger;
  }
}
