export interface AdminSession {
  email: string;
  rol: string;
}

export interface UserSession extends AdminSession {
  name: string;
  age: number;
  cart: string;
}
