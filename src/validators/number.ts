import { z } from "zod";
import ErrorHandler from "../utils/ErrorHandler";
import errorTypes from "../utils/errorTypes";

const numberSchema = z.object({
  quantity: z.number(),
});

function validateNumber(data: any): number {
  const validationResult = numberSchema.safeParse(data);
  if (validationResult.success) {
    return validationResult.data.quantity;
  } else {
    throw ErrorHandler.customError(
      "Number validation error",
      "Invalid number",
      errorTypes.ERROR_INVALID_ARGUMENTS,
      `Number was spected. Recieved: ${typeof data.quantity}`
    );
  }
}

export default validateNumber;
