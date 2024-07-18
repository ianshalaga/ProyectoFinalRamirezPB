import { Request } from "express";
import { createHash, isValidPassword } from "../utils/passwordHashing";
// Interfaces
import { DbCart } from "../interfaces/cart.interface";
import { DbUser } from "../interfaces/user.interface";
// Services
import { cartService, userService } from "../services/services";

class AuthController {
  constructor() {}

  // @@@@
  async register(req: Request, username: string, password: string, done) {
    try {
      const { email, firstName, lastName, age, rol } = req.body;
      const userExist: DbUser = await userService.getUserByEmail(email);
      if (userExist) {
        console.log("El usuario ya existe");
        return done(null, false); // User exist. No error.
      }
      const newCart: DbCart = await cartService.createCart();
      const newUser = {
        firstName,
        lastName,
        email,
        age,
        password: createHash(password),
        rol,
        cart: newCart._id,
      };
      const result = await userService.createUser(newUser);
      return done(null, result); // User successfully added
    } catch (error) {
      return done(error);
    }
  }

  // @@@@
  async login(username: string, password: string, done) {
    try {
      const user: DbUser = await userService.getUserByEmail(username);
      if (!user) return done(null, false);
      const valid = isValidPassword(user, password);
      if (!valid) return done(null, false);
      await userService.updateLastConnectionById(user._id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }

  // @@@@
  async githubLogin(accessToken, refreshToken, profile, done) {
    try {
      const user: DbUser = await userService.getUserByEmail(
        profile._json.email
      );
      if (!user) {
        const newCart: DbCart = await cartService.createCart();
        const newUser = {
          firstName: profile._json.name || "firstName",
          lastName: profile._json.name || "lastName",
          email: profile.login || "email",
          age: 0,
          password: " ",
          rol: "user",
          cart: newCart._id,
        };
        const result = await userService.createUser(newUser);
        done(null, result);
      } else {
        done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  }

  // @@@@
  async serializeUser(user: DbUser, done) {
    done(null, user._id);
  }

  // @@@@
  async deserializeUser(id: string, done) {
    try {
      let user: DbUser = await userService.getUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}

export default new AuthController();
