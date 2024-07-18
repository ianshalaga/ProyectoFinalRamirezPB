import * as chai from "chai";
import supertest from "supertest";
import { app } from "../src/app";
import { DbUser } from "../src/interfaces/user.interface";

const expect = chai.expect;
const requester = supertest(app);

describe("API Sessions", function () {
  this.timeout(5000); // Maximum waiting time for each test

  let sessionCookie: string; // Variable to store the session cookie

  before(async function () {});

  beforeEach(async function () {});

  // @@@@
  describe("POST /api/sessions/register", function () {
    it("Debe registrar un nuevo usuario", async function () {
      const newUser: Partial<DbUser> = {
        firstName: "Nuevo",
        lastName: "Usuario",
        email: "nuevo.usuario@example.com",
        age: 30,
        password: "password123",
        rol: "user",
      };

      const res = await requester.post("/api/sessions/register").send(newUser);
      expect(res.statusCode).to.equal(201);
    });

    it("Debe devolver 400 si el registro falla", async function () {
      const invalidUser = {
        // email: "nuevo.usuario@example.com", // No email
        password: "password123",
      };

      const res = await requester
        .post("/api/sessions/register")
        .send(invalidUser);
      expect(res.statusCode).to.equal(400);
    });
  });

  // @@@@
  describe("POST /api/sessions/login", function () {
    it("Debe iniciar sesión con credenciales válidas", async function () {
      const credentials = {
        email: "pedropascal@mail.com",
        password: "pedro",
      };

      const res = await requester.post("/api/sessions/login").send(credentials);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("status");
      expect(res.body.status).to.equal("success");

      // Capture the session cookie
      sessionCookie = extractSessionCookie(res);
    });

    it("Debe devolver 401 si las credenciales son inválidas", async function () {
      const invalidCredentials = {
        email: "usuario.invalido@example.com",
        password: "wrongpassword",
      };

      const res = await requester
        .post("/api/sessions/login")
        .send(invalidCredentials);
      expect(res.statusCode).to.equal(401);
    });
  });

  // @@@@
  describe("POST /api/sessions/logout", function () {
    it("Debe cerrar sesión", async function () {
      const res = await requester
        .post("/api/sessions/logout")
        .set("Cookie", sessionCookie);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("status");
      expect(res.body.status).to.equal("success");
    });
  });

  // @@@@
  describe("GET /api/sessions/current", function () {
    it("Debe devolver los datos del usuario actual", async function () {
      const loginRes = await requester.post("/api/sessions/login").send({
        email: "pedropascal@mail.com",
        password: "pedro",
      });
      expect(loginRes.statusCode).to.equal(200);

      const res = await requester
        .get("/api/sessions/current")
        .set("Cookie", sessionCookie);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("email");
      expect(res.body.email).to.equal("pedropascal@mail.com");
    });

    it("Debe devolver 401 si no hay sesión activa", async function () {
      const res = await requester.get("/api/sessions/current");
      expect(res.statusCode).to.equal(401);
    });
  });

  function extractSessionCookie(res: supertest.Response): string {
    const cookies = res.headers["set-cookie"];
    if (!cookies) throw new Error("No session cookie found in response");
    const cookiesArray = Array.isArray(cookies) ? cookies : [cookies];
    const sessionCookie = cookiesArray.map(
      (cookie: string) => cookie.split(";")[0]
    );
    return sessionCookie.join("; ");
  }
});
