import mongoose from "mongoose";
import config from "./env.config";

const dbUsername = config.dbUsername;
const dbPassword = config.dbPassword;
const dbName = config.dbName;

export const dbURI = `mongodb+srv://${dbUsername}:${dbPassword}@ecommerce.rvp8u39.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`;

export default class MongoDB {
  constructor() {
    this.connectToDb();
  }

  async connectToDb() {
    try {
      await mongoose.connect(dbURI);
      console.log(
        `Conexión con la base de datos ${dbName} de MongoDB Atlas exitosa.`
      );
    } catch (error) {
      console.error(
        `Error al intentar conectar con la base de datos ${dbName}:`,
        error
      );
      process.exit(1);
    }
  }

  static #instance: MongoDB;

  static getInstance() {
    if (this.#instance) {
      console.log(
        "La conexión con la base de datos de MongoDB ya se encuentra establecida."
      );
      return this.#instance;
    }
    this.#instance = new MongoDB();
    return this.#instance;
  }
}
