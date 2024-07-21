import { ApiUser } from "../../interfaces/user.interface";
import { DbUser } from "../../interfaces/user.interface";

export default class ApiUsersDTO {
  users: ApiUser[];

  constructor(dbUsers: DbUser[]) {
    this.users = dbUsers.map((dbUser) => {
      return {
        name: `${dbUser.firstName} ${dbUser.lastName}`,
        email: dbUser.email,
        rol: dbUser.rol,
      };
    });
  }
}
