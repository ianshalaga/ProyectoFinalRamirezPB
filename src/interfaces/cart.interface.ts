import { ProductCart } from "./product.interface";
import CartProduct from "../classes/CartProduct";

export interface Cart {
  products: ProductCart[];
}

export interface DbCart extends Cart {
  _id: string;
}

export interface IdCart {
  id: number;
  products: CartProduct[];
  [key: string]: number | CartProduct[];
}

export interface CartDAO {
  getAll(): Promise<DbCart[]>;
  create(): Promise<DbCart>;
  getById(id: string): Promise<DbCart>;
  addProduct(cid: string, pid: string): Promise<void>;
  removeProduct(cid: string, pid: string): Promise<void>;
  update(cid: string, updateProducts: ProductCart[]): Promise<void>;
  updateProductQuantity(
    cid: string,
    pid: string,
    quantity: number
  ): Promise<void>;
  clear(cid: string): Promise<void>;
}
