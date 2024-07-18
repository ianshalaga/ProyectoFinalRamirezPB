export interface UserLogin {
  email: string;
  password: string;
}

export interface UserDocument {
  name: string;
  reference: string;
}

export interface User extends UserLogin {
  firstName: string;
  lastName: string;
  age: number;
  rol: string;
  cart: string;
  resetToken: string;
  resetTokenExpires: number;
  documents: UserDocument[];
  last_connection: string;
}

export interface DbUser extends User {
  _id: string;
}

export interface UserDAO {
  getById(id: string): Promise<DbUser>;
  getByEmail(email: string): Promise<DbUser>;
  create(newUser: User): Promise<DbUser>;
  getByCart(cartId: string): Promise<DbUser>;
}
