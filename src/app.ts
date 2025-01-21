import express from "express";
import userRoutes from "./routes/user.routes";
import swagger from "./swagger";

const app = express();

app.use(express.json());
app.use("/api", userRoutes);

swagger(app);

export default app;
