import { Options } from "swagger-jsdoc";

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
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerOptions;
