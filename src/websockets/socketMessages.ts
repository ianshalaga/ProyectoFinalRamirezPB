import { Server } from "socket.io";
// Data Access Object (DAO)
import { productService } from "../services/services";
import messagesModel from "../dao/mongodb/models/message.mongodb.model";
// Interfaces
import { Product, GetProduct } from "../interfaces/product.interface";

function socketMessages(socketServer: Server) {
  const messages = [];

  socketServer.on("connection", async (socket) => {
    console.log("Cliente conectado");
    const limit = 1000;
    const page = 1;
    let products: GetProduct = await productService.getAllProducts(
      limit,
      page,
      null,
      null
    );

    socket.emit("products", products.payload);

    socket.on("newProduct", async (newProduct: Product) => {
      console.log("Nuevo producto");
      await productService.createProduct(newProduct);
      products = await productService.getAllProducts(limit, page, null, null);
      socket.emit("products", products.payload);
    });

    socket.on("message", async (data) => {
      messages.push(data);
      await messagesModel.create(data);
      socketServer.emit("messageLogs", messages);
    });
  });
}

export default socketMessages;
