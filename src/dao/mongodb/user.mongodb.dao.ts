/** Model */
import { usersModel } from "./models/user.mongodb.model";
/** Interfaces */
import {
  UserDAO,
  User,
  DbUser,
  UserDocument,
} from "../../interfaces/user.interface";

class UserMongodbDAO implements UserDAO {
  constructor() {}

  // @@@@
  async getByEmail(email: string): Promise<DbUser> {
    try {
      const DbUser: DbUser = await usersModel.findOne({ email: email });
      return DbUser;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async getById(id: string): Promise<DbUser> {
    try {
      const DbUser: DbUser = await usersModel.findById(id);
      return DbUser;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async create(newUser: User): Promise<DbUser> {
    try {
      const result: DbUser = (await usersModel.create(newUser)).toObject();
      return result;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async getByCart(cartId: string): Promise<DbUser> {
    try {
      const DbUser: DbUser = await usersModel.findOne({ cart: cartId });
      return DbUser;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async getByToken(token: string): Promise<DbUser> {
    try {
      const DbUser: DbUser = await usersModel.findOne({ resetToken: token });
      return DbUser;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async updateRolById(id: string, rol: string): Promise<void> {
    try {
      await usersModel.updateOne({ _id: id }, { $set: { rol } });
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async updatePasswordByToken(token: string, password: string): Promise<void> {
    try {
      await usersModel.updateOne({ resetToken: token }, { $set: { password } });
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async updateTokenByEmail(
    email: string,
    token: string,
    expires: number
  ): Promise<void> {
    try {
      await usersModel.updateOne(
        { email: email },
        { $set: { resetToken: token, resetTokenExpires: expires } }
      );
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async updateLastConnectionById(id: string): Promise<void> {
    try {
      await usersModel.updateOne(
        { _id: id },
        { $set: { last_connection: new Date() } }
      );
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async addDocumentsById(
    id: string,
    newDocuments: UserDocument[]
  ): Promise<void> {
    try {
      await usersModel.updateOne(
        { _id: id },
        { $push: { documents: { $each: newDocuments } } }
      );
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async deleteDocumentsById(id: string) {
    try {
      await usersModel.updateOne({ _id: id }, { $set: { documents: [] } });
    } catch (error) {
      throw error;
    }
  }
}

export default UserMongodbDAO;
