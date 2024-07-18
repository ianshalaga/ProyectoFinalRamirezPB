import * as chai from "chai";
import supertest from "supertest";
import { app } from "../src/app";
import { ProductCart } from "../src/interfaces/product.interface";

const expect = chai.expect;
const requester = supertest(app);

describe("API Carts", function () {
  this.timeout(5000); // Maximum waiting time for each tests

  before(async function () {});

  beforeEach(async function () {});

  // @@@@
  describe("GET /api/carts", function () {
    it("Debe devolver todos los carts", async function () {
      const res = await requester.get("/api/carts");
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  // @@@@
  describe("GET /api/carts/:cid", function () {
    it("Debe devolver un cart por su ID", async function () {
      const cid: string = "65fb1d64073956f544642f17";
      const res = await requester.get(`/api/carts/${cid}`);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("_id");
      expect(res.body._id).to.equal(cid);
    });

    it("Debe devolver 404 si el cart no existe", async function () {
      const res = await requester.get("/api/carts/invalid-id");
      expect(res.statusCode).to.equal(404);
    });
  });

  // @@@@
  describe("POST /api/carts", function () {
    it("Debe crear un nuevo cart", async function () {
      const res = await requester.post("/api/carts").send({});
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("_id");
    });
  });

  // @@@@
  describe("POST /api/carts/:cid/products/:pid", function () {
    it("Debe agregar un producto a un cart", async function () {
      const cid: string = "65fb1d64073956f544642f17";
      const pid: string = "65fb5b9fe7a55243efce35a7";
      const res = await requester
        .post(`/api/carts/${cid}/products/${pid}`)
        .send({});
      expect(res.statusCode).to.equal(200);
    });

    it("Debe devolver 404 si el cart o el producto no existen", async function () {
      const res = await requester
        .post("/api/carts/invalid-cart/products/invalid-product")
        .send({});
      expect(res.statusCode).to.equal(404);
    });
  });

  // @@@@
  describe("PUT /api/carts/:cid", function () {
    it("Debe actualizar un cart existente", async function () {
      const cid: string = "65fb1d64073956f544642f17";
      const updateProducts: ProductCart[] = [
        { product: "65fb5b9fe7a55243efce35a7", quantity: 2 },
      ];

      const res = await requester.put(`/api/carts/${cid}`).send(updateProducts);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("quantity");
      expect(res.body.quantity).to.equal(2);
    });

    it("Debe devolver 404 si el cart no existe", async function () {
      const updateProducts: ProductCart[] = [
        { product: "65fb5b9fe7a55243efce35a7", quantity: 2 },
      ];

      const res = await requester
        .put("/api/carts/invalid-id")
        .send(updateProducts);
      expect(res.statusCode).to.equal(404);
    });
  });
});
