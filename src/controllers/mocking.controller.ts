import { Request, Response } from "express";
import { mockingService } from "../services/services";
import { failureStatus } from "../utils/statuses";

class MockingController {
  constructor() {}

  async mockingProducts(req: Request, res: Response) {
    try {
      const fakeProducts = await mockingService.mockingProducts(100);
      res.status(200).json(fakeProducts);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }
}

export default new MockingController();
