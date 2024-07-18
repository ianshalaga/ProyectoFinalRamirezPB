import config from "../config/env.config";
import { Request, Response } from "express";
import { productsRoute } from "../utils/routes";
import validateQueryParams from "../validators/queryParams";
/** Services */
import { cartService, productService } from "../services/services";
// Interfaces
import { GetProduct, DbProduct } from "../interfaces/product.interface";
import { QueryParams } from "../interfaces/query.interface";
import { DbCart } from "../interfaces/cart.interface";

const PORT = config.port;

class ViewController {
  constructor() {}

  // @@@@
  async realTimeProducts(req: Request, res: Response) {
    try {
      res.render("realTimeProducts", {
        title: "Real Time Products",
        style: "app.css",
      });
    } catch (error) {
      res.render("failure", {
        title: "Real Time Products",
        style: "app.css",
        failureMessage: error.message,
      });
    }
  }
  // @@@@
  async chat(req: Request, res: Response) {
    try {
      res.render("chat", { title: "Chat", style: "app.css" });
    } catch (error) {
      res.render("failure", {
        title: "Chat",
        style: "app.css",
        failureMessage: error.message,
      });
    }
  }

  // @@@@
  async products(req: Request, res: Response) {
    try {
      let limitParsed: number = 2;
      let pageParsed: number = 1;
      const queryParams: QueryParams = validateQueryParams(req.query);
      const { limit, page, sort, query } = queryParams;
      // @@@@ Pendiente: Validar que el parseo a entero de limit y page de un número válido.
      if (limit) {
        limitParsed = parseInt(limit);
      }
      if (page) {
        pageParsed = parseInt(page);
      }
      const products: GetProduct = await productService.getAllProducts(
        limitParsed,
        pageParsed,
        sort,
        query
      );
      const nextLink = products.hasNextPage
        ? `http://localhost:${PORT}${productsRoute}?page=${products.nextPage}&limit=${limitParsed}`
        : "";
      const prevLink = products.hasPrevPage
        ? `http://localhost:${PORT}${productsRoute}?page=${products.prevPage}&limit=${limitParsed}`
        : "";
      const productsTemplate = {
        ...products,
        nextLink,
        prevLink,
      };
      res.render("products", {
        title: "Products",
        style: "app.css",
        products: productsTemplate,
        user: req.session.user,
        admin: req.session.admin,
      });
    } catch (error) {
      res.render("failure", {
        title: "Products",
        style: "app.css",
        failureMessage: error.message,
      });
    }
  }

  // @@@@
  async cart(req: Request, res: Response) {
    try {
      const cid: string = req.params.cid;
      const cart: DbCart = await cartService.getCartById(cid);
      res.render("cartDetail", {
        title: "Cart detail",
        style: "app.css",
        cart: cart,
      });
    } catch (error) {
      res.render("failure", {
        title: "Cart detail",
        style: "app.css",
        failureMessage: error.message,
      });
    }
  }

  // @@@@
  async product(req: Request, res: Response) {
    try {
      const pid: string = req.params.pid;
      const product: DbProduct = await productService.getProductById(pid);
      res.render("product", {
        title: "Product",
        style: "app.css",
        product: product,
      });
    } catch (error) {
      res.render("failure", {
        title: "Product",
        style: "app.css",
        failureMessage: error.message,
      });
    }
  }

  // @@@@
  async register(req: Request, res: Response) {
    try {
      res.render("register", {
        title: "Register",
        style: "app.css",
      });
    } catch (error) {
      res.render("failure", {
        title: "Register",
        style: "app.css",
        failureMessage: error.message,
      });
    }
  }

  // @@@@
  async login(req: Request, res: Response) {
    try {
      res.render("login", {
        title: "Login",
        style: "app.css",
      });
    } catch (error) {
      res.render("failure", {
        title: "Login",
        style: "app.css",
        failureMessage: error.message,
      });
    }
  }

  // @@@@
  async profile(req: Request, res: Response) {
    try {
      res.render("profile", {
        title: "Profile",
        style: "app.css",
        user: req.session.user,
      });
    } catch (error) {
      res.render("failure", {
        title: "Profile",
        style: "app.css",
        failureMessage: error.message,
      });
    }
  }

  // @@@@
  async index(req: Request, res: Response) {
    try {
      res.render("login", {
        title: "Login",
        style: "app.css",
      });
    } catch (error) {
      res.render("failure", {
        title: "Login",
        style: "app.css",
        failureMessage: error.message,
      });
    }
  }

  // @@@@
  async resetPassword(req: Request, res: Response) {
    try {
      res.render("resetPassword", {
        title: "Reset Password",
        style: "app.css",
      });
    } catch (error) {
      res.render("failure", {
        title: "Reset Password",
        style: "app.css",
        failureMessage: error.message,
      });
    }
  }

  // @@@@
  async createNewPassword(req: Request, res: Response) {
    try {
      res.render("newPassword", {
        title: "Create New Password",
        style: "app.css",
      });
    } catch (error) {
      res.render("failure", {
        title: "Reset Password",
        style: "app.css",
        failureMessage: error.message,
      });
    }
  }
}

export default new ViewController();
