import { DbProduct } from "../interfaces/product.interface";
import mocking from "../utils/Mocking";

export default class MockingService {
  constructor() {}

  async mockingProducts(quantity: number): Promise<DbProduct[]> {
    try {
      const fakeProducts: DbProduct[] = [];
      for (let i = 0; i < quantity; i++) {
        const dbProduct: DbProduct = await mocking.mockingProduct();
        fakeProducts.push(dbProduct);
      }
      return fakeProducts;
    } catch (error) {
      throw error;
    }
  }
}
