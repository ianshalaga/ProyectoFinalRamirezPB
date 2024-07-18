/** Factory */
import { carts, products, users, tickets } from "../dao/factory";
/** Services */
import CartService from "./cart.service";
import ProductService from "./product.service";
import UserService from "./user.service";
import TicketService from "./ticket.service";
import MailService from "./mail.service";
import SmsService from "./sms.service";
import MockingService from "./mocking.service";

export const cartService = new CartService(carts);
export const productService = new ProductService(products);
export const userService = new UserService(users);
export const ticketService = new TicketService(tickets);
export const mailService = new MailService();
export const smsService = new SmsService();
export const mockingService = new MockingService();
