import UserMongodbDAO from "../dao/mongodb/user.mongodb.dao";
import { User, UserDocument } from "../interfaces/user.interface";

export default class UserService {
  dao: UserMongodbDAO;

  constructor(dao: UserMongodbDAO) {
    this.dao = dao;
  }

  async getUserById(id: string) {
    return await this.dao.getById(id);
  }

  async getUserByEmail(email: string) {
    return await this.dao.getByEmail(email);
  }

  async createUser(newUser: User) {
    return await this.dao.create(newUser);
  }

  async getUserByCart(cartId: string) {
    return await this.dao.getByCart(cartId);
  }

  async getUserByToken(token: string) {
    return await this.dao.getByToken(token);
  }

  async updateUserRolById(id: string, rol: string) {
    return await this.dao.updateRolById(id, rol);
  }

  async updateUserPasswordByToken(token: string, password: string) {
    return await this.dao.updatePasswordByToken(token, password);
  }

  async updateUserTokenByEmail(email: string, token: string, expires: number) {
    return await this.dao.updateTokenByEmail(email, token, expires);
  }

  async updateLastConnectionById(id: string) {
    return await this.dao.updateLastConnectionById(id);
  }

  async addDocumentsById(id: string, newDocuments: UserDocument[]) {
    return await this.dao.addDocumentsById(id, newDocuments);
  }

  async deleteDocumentsByIdUser(id: string) {
    return await this.dao.deleteDocumentsById(id);
  }
}
