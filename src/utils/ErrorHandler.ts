import { CustomError } from "../interfaces/error.interface";

export default class ErrorHandler {
  static customError(
    name: string,
    message: string,
    code: number,
    description: string
  ): CustomError {
    const customError = new Error(message) as CustomError;
    customError.name = name;
    customError.code = code;
    customError.description = description;
    return customError;
  }
}
