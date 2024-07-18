import ErrorHandler from "../utils/ErrorHandler";
import productInfoError from "../utils/errors/productInfo.error";
import errorTypes from "../utils/errorTypes";
import { Product } from "../interfaces/product.interface";
import { z } from "zod";

const productSchema = z.object({
  title: z.string(),
  description: z.string(),
  code: z.string(),
  price: z.number(),
  stock: z.number(),
  category: z.string(),
  status: z.boolean().optional(),
  thumbnail: z.array(z.string()).optional(),
  owner: z.string().optional(),
});

function validateProduct(data: any): Product {
  const validationResult = productSchema.safeParse(data);
  if (validationResult.success) {
    return validationResult.data as Product;
  } else {
    throw ErrorHandler.customError(
      "Product validation error",
      "Invalid product data",
      errorTypes.ERROR_DATA,
      productInfoError(data)
    );
  }
}

export default validateProduct;
