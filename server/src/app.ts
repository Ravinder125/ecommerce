import express, { Request, Response } from "express";
import morgan from 'morgan'
import cors, { CorsOptions } from 'cors'
import Stripe from 'stripe';

const app = express();
// const origin = "http://localhost:5173"
const corsOptions: CorsOptions = {
    origin: env.ORIGIN,
    credentials: true
}
// const STRIPE_KEY_PUBLISHABLE_KEY = process.env.STRIPE_KEY_PUBLISHABLE_KEY;

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-02-25.clover"
})

// async function something() {
//     const newId = new mongoose.Types.ObjectId("69c266d1286de87f6149d1ef");
//     const oldId = "bgZ00VGHfgQ6ojK52MkwF5JobPu2"
//     await mongoose
//         .connection
//         .collection("products")
//         .updateMany(
//             { owner: oldId },
//             { $set: { owner: newId } }
//         )

//     await mongoose
//         .connection
//         .collection("orders")
//         .updateMany(
//             { buyer: oldId },
//             { $set: { buyer: newId } }
//         )

//     console.log("Migration completed")
// }

// something()


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
import { env } from "./config/env.js";
import { Order } from "./models/order.models.js";
import { Product } from "./models/product.models.js";
import mongoose from "mongoose";
// import { connectToRedis } from './config/redis.js';

connectDB();
connectToRedis();

app.listen(env.PORT, () => {
    console.log(`Server is listening on http://localhost:${env.PORT}`)
})

export default app