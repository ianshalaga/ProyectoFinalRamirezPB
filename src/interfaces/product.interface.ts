import query from "../types/query";

export interface Product {
  title: string;
  description: string;
  code: string;
  price: number;
  stock: number;
  category: string;
  status: boolean;
  thumbnail: string[];
  owner: string;
  [key: string]: string | string[] | number | boolean; // to access with obj[field] form
}

export interface DbProduct extends Product {
  _id: string;
  [key: string]: string | string[] | number | boolean;
}

export interface IdProduct extends Product {
  id: number;
  [key: string]: string | string[] | number | boolean; // to access with obj[field] form
}

export interface GetProduct {
  status: "success" | "error";
  payload: DbProduct[];
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

// ? Optional properties
export interface UpdateProduct {
  title?: string;
  description?: string;
  code?: string;
  price?: number;
  stock?: number;
  category?: string;
  status?: boolean;
  thumbnail?: string[];
  owner?: string;
  [key: string]: string | string[] | number | boolean; // to access with obj[field] form
}

export interface ProductCart {
  product: string;
  quantity: number;
}

export interface ProductDAO {
  getAll(
    limit: number,
    page: number,
    sort: string,
    query: query
  ): Promise<GetProduct>;
  create(productObj: Product): Promise<void>;
  getById(id: string): Promise<DbProduct>;
  update(id: string, updateObj: UpdateProduct): Promise<void>;
  delete(id: string): Promise<void>;
}
