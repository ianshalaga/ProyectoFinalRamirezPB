import ErrorHandler from "../utils/ErrorHandler";
import productInfoError from "../utils/errors/productInfo.error";
import errorTypes from "../utils/errorTypes";
import { Product } from "../interfaces/product.interface";
import { z } from "zod";

const productSchema = z.object({
  title: z.string(),
  description: z.string(),
  code: z.string(),
  price: z.number().min(0, { message: "Price cannot be negative" }),
  stock: z.number().min(0, { message: "Stock cannot be negative" }),
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
    const errorDetails = validationResult.error.errors
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    throw ErrorHandler.customError(
      "Product validation error",
      `Invalid product data: ${errorDetails}`,
      errorTypes.ERROR_DATA,
      productInfoError(data)
    );
  }
}

export default validateProduct;
