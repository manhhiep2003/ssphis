import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import swagger from "./swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", userRoutes);

swagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
