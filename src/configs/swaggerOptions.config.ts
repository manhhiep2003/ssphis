import { Options } from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config();
const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Software Supporting Psychological Health in Schools API",
      version: "1.0.0",
      description:
        "API documentation for Software Supporting Psychological Health in Schools",
    },
    servers: [
      {
        url: process.env.DB_HOSTS || "http://localhost:3001",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/docs/*.ts"],
};

export default swaggerOptions;
