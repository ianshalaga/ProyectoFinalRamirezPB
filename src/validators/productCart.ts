import { ProductCart } from "../interfaces/product.interface";
import { z } from "zod";
import ErrorHandler from "../utils/ErrorHandler";
import errorTypes from "../utils/errorTypes";

const productCartSchema = z
  .object({
    product: z.string(),
    quantity: z.number(),
  })
  .strict();

function validateProductCart(data: any): ProductCart[] {
  const validatedProducts: ProductCart[] = [];

  for (const item of data) {
    const validationResult = productCartSchema.safeParse(item);
    if (validationResult.success) {
      validatedProducts.push(item);
    } else {
      throw ErrorHandler.customError(
        "Data validation error",
        "Invalid Product Cart",
        errorTypes.ERROR_DATA,
        `ProductCart instance was spected. Recieved: ${item}`
      );
      // throw new Error("Objeto de actualización inválido.");
    }
  }
  return validatedProducts;
}

export default validateProductCart;
