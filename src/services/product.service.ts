import ProductMongodbDAO from "../dao/mongodb/product.mongodb.dao";
import query from "../types/query";
/** Interfaces */
import { Product, UpdateProduct } from "../interfaces/product.interface";

export default class ProductService {
  dao: ProductMongodbDAO;

  constructor(dao: ProductMongodbDAO) {
    this.dao = dao;
  }

  async getAllProducts(
    limit: number,
    page: number,
    sort: string,
    query: query
  ) {
    return await this.dao.getAll(limit, page, sort, query);
  }

  async createProduct(productObj: Product) {
    return await this.dao.create(productObj);
  }

  async getProductById(id: string) {
    return await this.dao.getById(id);
  }

  async updateProduct(id: string, updateObj: UpdateProduct) {
    return await this.dao.update(id, updateObj);
  }

  async deleteProduct(id: string) {
    return await this.dao.delete(id);
  }
}
