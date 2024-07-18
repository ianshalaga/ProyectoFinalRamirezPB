import { Router } from "express";

// Routers
import productsRouter from "./product.router";
import cartsRouter from "./cart.router";
import sessionsRouter from "./session.router";
import viewsRouter from "./view.router";
import mockingRouter from "./mocking.router";
import loggerRouter from "./logger.router";
import usersRouter from "./user.router";

import {
  apiRoute,
  productsRoute,
  cartsRoute,
  sessionsRoute,
  usersRoute,
} from "../utils/routes";

const routes = Router();

routes.use(apiRoute + productsRoute, productsRouter); // API Products
routes.use(apiRoute + cartsRoute, cartsRouter); // API Carts
routes.use(apiRoute + sessionsRoute, sessionsRouter); // API Sessions
routes.use(apiRoute + usersRoute, usersRouter); // API Users
routes.use(mockingRouter); // Mocking
routes.use(loggerRouter); // Logger
routes.use(viewsRouter); // Views

export default routes;
