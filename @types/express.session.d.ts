import { UserSession, AdminSession } from "../src/interfaces/session.interface";

declare module "express-session" {
  interface Session {
    user: UserSession;
    admin: AdminSession;
  }
}
