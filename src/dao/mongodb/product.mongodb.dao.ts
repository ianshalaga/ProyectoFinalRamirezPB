/** Model */
import { productsModel } from "./models/product.mongodb.model";
/** Types */
import query from "../../types/query";
/** Interfaces */
import {
  ProductDAO,
  Product,
  DbProduct,
  UpdateProduct,
  GetProduct,
} from "../../interfaces/product.interface";

class ProductMongodbDAO implements ProductDAO {
  constructor() {}

  // @@@@
  async getAll(
    limit: number,
    page: number,
    sort: string,
    query: query
  ): Promise<GetProduct> {
    try {
      const options = {
        limit: limit,
        page: page,
        sort: sort === "asc" ? { price: 1 } : { price: -1 },
        lean: true,
      };
      const result = await productsModel.paginate(query, options);
      const products: GetProduct = {
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
      };
      return products;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async create(productObj: Product): Promise<void> {
    try {
      const existingProduct = await productsModel.findOne({
        code: productObj.code,
      });
      if (existingProduct) {
        throw new Error(
          "El código del producto que está intentando agregar ya existe. Utilice otro código."
        );
      }
      await productsModel.create(productObj);
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async getById(id: string): Promise<DbProduct> {
    try {
      const product = await productsModel.findById(id);
      const dbProduct: DbProduct = await product.toObject();
      return dbProduct;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async update(id: string, updateObj: UpdateProduct): Promise<void> {
    try {
      const product = await this.getById(id);
      Object.keys(updateObj).forEach((key: string) => {
        product[key] = updateObj[key];
      });
      await productsModel.updateOne({ _id: id }, { $set: product });
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async delete(id: string): Promise<void> {
    try {
      await productsModel.deleteOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }
}

export default ProductMongodbDAO;
