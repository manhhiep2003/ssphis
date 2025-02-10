import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import roleRoutes from "./routes/role.routes";
import timeSlotRoutes from "./routes/timeSlot.routes";
import swagger from "./swagger";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// Use CORS middleware with options
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", roleRoutes);
app.use("/api", timeSlotRoutes);
swagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
