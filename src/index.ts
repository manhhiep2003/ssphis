import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import roleRoutes from "./routes/role.routes";
import swagger from "./swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", roleRoutes);
swagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
