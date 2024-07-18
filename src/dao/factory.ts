/** Config */
import config from "../config/env.config";
import MongoDB from "../config/mongoDb.config";
/** DAO */
import CartMongodbDAO from "./mongodb/cart.mongodb.dao";
import ProductMongodbDAO from "./mongodb/product.mongodb.dao";
import TicketMongodbDAO from "./mongodb/ticket.mongodb.dao";
import UserMongodbDAO from "./mongodb/user.mongodb.dao";

export let carts: CartMongodbDAO;
export let products: ProductMongodbDAO;
export let users: UserMongodbDAO;
export let tickets: TicketMongodbDAO;

switch (config.dao) {
  case "mongodb":
    MongoDB.getInstance();
    const { default: cartsMongodb } = await import(
      "./mongodb/cart.mongodb.dao"
    );
    const { default: productsMongodb } = await import(
      "./mongodb/product.mongodb.dao"
    );
    const { default: usersMongodb } = await import(
      "./mongodb/user.mongodb.dao"
    );
    const { default: ticketsMongodb } = await import(
      "./mongodb/ticket.mongodb.dao"
    );
    carts = new cartsMongodb();
    products = new productsMongodb();
    users = new usersMongodb();
    tickets = new ticketsMongodb();
    break;
  case "files":
    // No implementation
    break;
  default:
    break;
}
