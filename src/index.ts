import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.route";
import userRoutes from "./routes/user.routes";
import roleRoutes from "./routes/role.routes";
import timeSlotRoutes from "./routes/timeSlot.routes";
import appointmentsRoutes from "./routes/appointments.routes";
import markdownRotes from "./routes/markdown.routes";
import categoryRoutes from "./routes/category.routes";
import surveyRoutes from "./routes/survey.routes";
import programRoutes from "./routes/program.routes";
import questionRoutes from "./routes/question.routes";
import questionOptionRoutes from "./routes/questionOption.routes";
import surveyResultRoutes from "./routes/surveyResult.routes";
import vnpayRoutes from "./routes/payment.routes";
import swagger from "./swagger";
import { initializeApp } from "./configs/init.config";
import reportRouter from "./routes/reports.routes";

dotenv.config();

async function bootstrap() {
  const app = express();
  const PORT = process.env.PORT || 8080;

  app.use(cors());

  app.use(express.json());

  await initializeApp();

  // Routes
  app.use("/api", authRoute);
  app.use("/api", userRoutes);
  app.use("/api", roleRoutes);
  app.use("/api", timeSlotRoutes);
  app.use("/api", appointmentsRoutes);
  app.use("/api", markdownRotes);
  app.use("/api", categoryRoutes);
  app.use("/api", surveyRoutes);
  app.use("/api", programRoutes);
  app.use("/api", questionRoutes);
  app.use("/api", questionOptionRoutes);
  app.use("/api", surveyResultRoutes);
  app.use("/api", vnpayRoutes);
  app.use("/api", reportRouter);
  // Swagger
  swagger(app);

  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Error during app initialization:", err);
});
