import { z } from "zod";
import ErrorHandler from "../utils/ErrorHandler";
import errorTypes from "../utils/errorTypes";

const numberSchema = z.object({
  quantity: z
    .number()
    .min(0, { message: "Quantity must be a non-negative number" }),
});

function validateNumber(data: any): number {
  const validationResult = numberSchema.safeParse(data);
  if (validationResult.success) {
    return validationResult.data.quantity;
  } else {
    throw ErrorHandler.customError(
      "Number validation error",
      validationResult.error.errors[0]?.message || "Invalid number",
      errorTypes.ERROR_INVALID_ARGUMENTS,
      `Number was expected. Received: ${typeof data.quantity}`
    );
  }
}

export default validateNumber;
