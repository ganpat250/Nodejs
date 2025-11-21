import e from "express";
import studentRoutes from "./routes/studentRoutes.js";
import authRoute from "./routes/authRoute.js";
const app = e();
app.use(e.json());
app.use(studentRoutes);
app.use(authRoute);
export default app;