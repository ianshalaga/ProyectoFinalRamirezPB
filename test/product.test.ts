import * as chai from "chai";
import supertest from "supertest";
import { app } from "../src/app";
import { Product } from "interfaces/product.interface";

const expect = chai.expect;
const requester = supertest(app);

describe("API Products", async function () {
  this.timeout(5000); // Maximum waiting time for each tests

  before(async function () {});

  beforeEach(async function () {
    // Restore data from database
  });

  // @@@@
  describe("GET /api/products", async function () {
    it("Debe devolver todos los productos", async function () {
      const res = await requester.get("/api/products");
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  // @@@@
  describe("GET /api/products/:pid", function () {
    it("Debe devolver un producto por su ID", async function () {
      const pid: string = "65fb5bee546d20c1e8b304c7";
      const res = await requester.get(`/api/products/${pid}`); // Cambia este ID por uno válido en tu BD
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("_id");
      expect(res.body._id).to.equal(pid);
    });

    it("Debe devolver 404 si el producto no existe", async function () {
      const res = await requester.get("/api/products/invalid-id");
      expect(res.statusCode).to.equal(404);
    });
  });

  // @@@@
  describe("POST /api/products", function () {
    it("Debe crear un nuevo producto", async function () {
      const newProduct: Product = {
        title: "Nuevo Producto",
        description: "Descripción del nuevo producto",
        code: "ABC123",
        price: 100,
        stock: 10,
        category: "Categoría",
        status: true,
        thumbnail: [],
        owner: "admin",
      };

      const res = await requester.post("/api/products").send(newProduct);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("_id");
    });

    it("Debe devolver 400 si el producto no es válido", async function () {
      const invalidProduct = {
        title: "",
        description: "Descripción del nuevo producto",
        // code: "ABC123", // No code
        price: 100,
        stock: 10,
        category: "Categoría",
        status: true,
        thumbnail: [],
        owner: "admin",
      };

      const res = await requester.post("/api/products").send(invalidProduct);
      expect(res.statusCode).to.equal(400);
    });
  });

  describe("PUT /api/products/:pid", function () {
    it("Debe actualizar un producto existente", async function () {
      const newTitle = "Nuevo title";
      const updateData = {
        title: newTitle,
      };

      const res = await requester
        .put("/api/products/65fb5bee546d20c1e8b304c7")
        .send(updateData);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("title");
      expect(res.body.title).to.equal(newTitle);
    });

    it("Debe devolver 404 si el producto no existe", async function () {
      const updateData = {
        title: "Nuevo title",
      };

      const res = await requester
        .put("/api/products/invalid-id")
        .send(updateData);
      expect(res.statusCode).to.equal(404);
    });
  });
});
