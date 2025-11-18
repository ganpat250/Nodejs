import express from "express";
import authRoutes from "./routes/authRoute.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
app.use(express.json());
app.use("/auth",authRoutes);
app.use("/students",studentRoutes);

export default app;