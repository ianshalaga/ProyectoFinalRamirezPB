import { Options } from "swagger-jsdoc";
import { rootPath } from "./paths";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "E-Commerce CoderHouse Backend",
      version: "1.0.0",
      description:
        "Documentación API del proyecto e-commerce de programación backend de CoderHouse",
    },
  },
  apis: [`${rootPath}/src/docs/**/*.yaml`],
};

export default swaggerOptions;
