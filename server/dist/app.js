import express from "express";
import dotenv from 'dotenv';
const app = express();
// Middlewares
dotenv.config();
app.use(express.json());
app.use(express.urlencoded());
// Health Check
app.get("/api/v1/health", (_, res) => res.send("Api working with /api/v1"));
// Importing Routes
import userRouter from './routes/user.routes.js';
import { connectDB } from "./config/db.js";
// route - /api/v1/users/register
app.use("/api/v1/users", userRouter);
// DB connection
connectDB()
    .then((v) => console.log("Db is connected"))
    .catch((e) => console.error("Connection failed", e.message));
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listing on http://localhost:${port}`);
});
export default app;
