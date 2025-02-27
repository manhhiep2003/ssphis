import express from "express";
import dotenv from "dotenv";
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
import cors from "cors";
// import { CronService } from "./services/cron.service";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// Use CORS middleware with options
app.use(cors());
app.use(express.json());
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
// CronService.initCronJobs();
swagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
