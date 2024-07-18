import { Router } from "express";
import loggerController from "../controllers/logger.controller";

const loggerRouter = Router();

loggerRouter.get("/loggerTest", loggerController.loggerTest);

export default loggerRouter;
