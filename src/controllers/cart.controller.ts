import { Request, Response } from "express";
import {
  cartService,
  mailService,
  productService,
  smsService,
  ticketService,
  userService,
} from "../services/services";
import { successStatus, failureStatus } from "../utils/statuses";
import { buys } from "../utils/mailing";
// Interfaces
import { DbCart } from "../interfaces/cart.interface";
import { ProductCart, DbProduct } from "../interfaces/product.interface";
import { DbUser } from "../interfaces/user.interface";
import { Ticket } from "../interfaces/ticket.interface";
// Validators
import validateNumber from "../validators/number";
import validateProductCart from "../validators/productCart";

class CartController {
  constructor() {}

  // @@@@
  async getAllCarts(req: Request, res: Response) {
    try {
      const cart: DbCart[] = await cartService.getAllCarts();
      res.status(200).json(cart);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async getCartById(req: Request, res: Response) {
    try {
      const cid: string = req.params.cid;
      const cart: DbCart = await cartService.getCartById(cid);
      res.status(200).json(cart);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async createCart(req: Request, res: Response) {
    try {
      await cartService.createCart();
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async addProductCart(req: Request, res: Response) {
    try {
      const cid: string = req.params.cid;
      const pid: string = req.params.pid;
      const { user } = req.session;
      if (user.rol === "premium") {
        const dbProduct: DbProduct = await productService.getProductById(pid);
        if (dbProduct.owner === user.email) {
          return res
            .status(403)
            .json({ message: "The User owns this product." });
        }
      }
      await cartService.addProductCart(cid, pid);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async updateCart(req: Request, res: Response) {
    try {
      const cid: string = req.params.cid;
      const updateProducts: ProductCart[] = validateProductCart(req.body);
      await cartService.updateCart(cid, updateProducts);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async updateProductQuantityCart(req: Request, res: Response) {
    try {
      const cid: string = req.params.cid;
      const pid: string = req.params.pid;
      const quantity: number = validateNumber(req.body);
      await cartService.updateProductQuantityCart(cid, pid, quantity);
      res.status(200).json(successStatus);
    } catch (error) {
      req.logger.error(error.mesaage);
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async removeProductCart(req: Request, res: Response) {
    try {
      const cid: string = req.params.cid;
      const pid: string = req.params.pid;
      await cartService.removeProductCart(cid, pid);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async clearCart(req: Request, res: Response) {
    try {
      const cid: string = req.params.cid;
      await cartService.clearCart(cid);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async purchase(req: Request, res: Response) {
    try {
      const cid: string = req.params.cid;
      const user: DbUser = await userService.getUserByCart(cid);
      let amount: number = 0; // Total price
      const noPurchased: ProductCart[] = [];
      const stockless: string[] = [];
      const stockUpdates: Promise<void>[] = [];
      const cart: DbCart = await cartService.getCartById(cid);
      cart.products.forEach((product: ProductCart) => {
        const updateStockPromise = productService
          .getProductById(product.product)
          .then(async (dbProduct: DbProduct) => {
            let diff = dbProduct.stock - product.quantity;
            if (diff >= 0) {
              await productService.updateProduct(product.product, {
                stock: diff,
              });
              amount += product.quantity * dbProduct.price;
            } else {
              stockless.push(product.product);
              noPurchased.push(product);
            }
          });
        stockUpdates.push(updateStockPromise);
      });
      await Promise.all(stockUpdates);
      const ticket: Ticket = {
        amount: amount,
        purchaser: user.email,
      };
      await ticketService.createTicket(ticket);
      await cartService.updateCart(cid, noPurchased);
      await mailService.googleMailService(user.email, buys.subject, buys.html);
      // await smsService.twilioSmsService("+330769537363");
      if (stockless.length > 0) {
        res.json(stockless);
      } else {
        res.status(200).json(successStatus);
      }
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }
}

export default new CartController();
