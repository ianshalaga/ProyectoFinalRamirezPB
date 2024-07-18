import { UserSession } from "../../interfaces/session.interface";
import { User } from "../../interfaces/user.interface";

export default class CurrentUserDTO {
  currentUser: UserSession;

  constructor(user: User) {
    this.currentUser = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      age: user.age,
      rol: user.rol,
      cart: user.cart,
    };
  }
}
