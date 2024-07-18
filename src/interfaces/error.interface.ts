export interface CustomError extends Error {
  name: string;
  code: number;
  description: string;
}
