import { Router } from "express";
import mockingController from "../controllers/mocking.controller";

const mockingRouter = Router();

mockingRouter.get("/mockingproducts", mockingController.mockingProducts);

export default mockingRouter;
