import express from "express";
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config({ path: "./.env" })
const app = express();

// Middlewares
app.use(express.json())
app.use(morgan("dev"))

// Health Check
app.get("/api/v1/health", (_, res) => res.send("Api working with /api/v1"))

// Importing Routes
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import orderRouter from './routes/order.routes.js'

// route - /api/v1/users/register
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);

// DB and Caching connection
import { connectDB } from "./config/db.js";
import { connectToRedis } from './config/redis.js';

connectDB();
connectToRedis();

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})

export default app