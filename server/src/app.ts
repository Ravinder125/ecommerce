import express, { Request, Response } from "express";
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors, { CorsOptions } from 'cors'
import Stripe from 'stripe';

dotenv.config({ path: "./.env" })
const app = express();
const origin = "http://localhost:5173"
const corsOptions: CorsOptions = {
    origin,
    credentials: true
}
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
// const STRIPE_KEY_PUBLISHABLE_KEY = process.env.STRIPE_KEY_PUBLISHABLE_KEY;

if (!STRIPE_SECRET_KEY) {
    throw new Error("Stripe keys are missing")
}

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2026-02-25.clover"
})

app.use(cors(corsOptions))

// Middlewares
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(morgan("dev"))

// Health Check
app.get("/api/v1/health", (_: Request, res: Response) => res.send("Api working with /api/v1"))

// Importing Routes
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import orderRouter from './routes/order.routes.js'
import paymentRouter from './routes/payment.routes.js'
import dashboardRouter from './routes/stats.routes.js'

// route - /api/v1/users/register
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/dashboard", dashboardRouter);
// app.use("https://f662ebeabd71.ngrok-free.app", clerkRoute)

// DB and Caching connection
import { connectDB } from "./config/db.js";
import { connectToRedis } from "./config/redis.js";
// import { connectToRedis } from './config/redis.js';

connectDB();
connectToRedis();

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})

export default app