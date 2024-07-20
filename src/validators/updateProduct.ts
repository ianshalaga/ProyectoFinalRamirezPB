import { UpdateProduct } from "../interfaces/product.interface";
import { z } from "zod";

const updateProductSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    code: z.string().optional(),
    price: z
      .number()
      .min(0, { message: "El precio no puede ser negativo" })
      .optional(),
    stock: z
      .number()
      .min(0, { message: "El stock no puede ser negativo" })
      .optional(),
    category: z.string().optional(),
    status: z.boolean().optional(),
    thumbnail: z.array(z.string()).optional(),
  })
  .strict();

function validateUpdateProduct(data: any): UpdateProduct {
  const validationResult = updateProductSchema.safeParse(data);
  if (validationResult.success) {
    return validationResult.data;
  } else {
    const errors = validationResult.error.errors.map((err) => {
      return {
        path: err.path.join("."),
        message: err.message,
      };
    });
    throw new Error(
      `Objeto de actualización inválido: ${JSON.stringify(errors)}`
    );
  }
}

export default validateUpdateProduct;
