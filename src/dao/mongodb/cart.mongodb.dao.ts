/** Model */
import cartsModel from "./models/cart.mongodb.model";
/** Interfaces */
import { CartDAO, DbCart, Cart } from "../../interfaces/cart.interface";
import { ProductCart } from "../../interfaces/product.interface";

class CartMongodbDAO implements CartDAO {
  constructor() {}

  // @@@@
  async getAll(): Promise<DbCart[]> {
    try {
      const carts = await cartsModel.find();
      let dbCarts: DbCart[] = [];
      carts.forEach((cart) => {
        dbCarts.push(cart.toObject());
      });
      return dbCarts;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async create(): Promise<DbCart> {
    try {
      const cart: Cart = { products: [] };
      const dbCartDoc = await cartsModel.create(cart);
      const dbCart: DbCart = dbCartDoc.toObject();
      return dbCart;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async getById(id: string): Promise<DbCart> {
    try {
      const cart = await cartsModel.findById(id).populate("products.product");
      const dbCart: DbCart = await cart.toObject();
      return dbCart;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async addProduct(cid: string, pid: string): Promise<void> {
    try {
      const cart = await cartsModel.findById(cid);
      const dbCart: DbCart = await cart.toObject();
      let productExist = false;
      const updatedProducts = dbCart.products.map((productInCart) => {
        if (productInCart.product.toString() === pid) {
          productExist = true;
          const productCart = {
            product: productInCart.product,
            quantity: productInCart.quantity + 1,
          };
          productInCart = productCart;
        }
        return productInCart;
      });
      dbCart.products = updatedProducts;
      if (!productExist) {
        const productCart = {
          product: pid,
          quantity: 1,
        };
        dbCart.products.push(productCart);
      }
      await cartsModel.updateOne({ _id: cid }, { $set: dbCart });
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async removeProduct(cid: string, pid: string): Promise<void> {
    try {
      const cart = await cartsModel.findById(cid);
      const dbCart: DbCart = await cart.toObject();
      const updatedProducts = [];
      dbCart.products.forEach((productInCart) => {
        if (!(productInCart.product.toString() === pid)) {
          updatedProducts.push(productInCart);
        }
      });
      dbCart.products = updatedProducts;
      await cartsModel.updateOne({ _id: cid }, { $set: dbCart });
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async update(cid: string, updateProducts: ProductCart[]): Promise<void> {
    try {
      const cart = await cartsModel.findById(cid);
      const dbCart: DbCart = await cart.toObject();
      dbCart.products = updateProducts;
      await cartsModel.updateOne({ _id: cid }, { $set: dbCart });
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async updateProductQuantity(
    cid: string,
    pid: string,
    quantity: number
  ): Promise<void> {
    try {
      const cart = await cartsModel.findById(cid);
      const dbCart: DbCart = await cart.toObject();
      dbCart.products.forEach((product) => {
        if (product.product.toString() === pid) {
          product.quantity = quantity;
        }
      });
      await cartsModel.updateOne({ _id: cid }, { $set: dbCart });
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async clear(cid: string): Promise<void> {
    try {
      const cart = await cartsModel.findById(cid);
      const dbCart: DbCart = await cart.toObject();
      dbCart.products = [];
      await cartsModel.updateOne({ _id: cid }, { $set: dbCart });
    } catch (error) {
      throw error;
    }
  }
}

// export default new CartMongodbDAO();
export default CartMongodbDAO;
