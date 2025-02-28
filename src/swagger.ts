import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./configs/swaggerOptions.config";

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const swagger = (app: express.Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default swagger;
