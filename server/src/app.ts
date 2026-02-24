import express from "express";
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors, { CorsOptions } from 'cors'

dotenv.config({ path: "./.env" })
const app = express();
const corsOptions: CorsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

const publishableKey = process.env.CLERK_PUBLISHABLE_KEY as string
const secretKey = process.env.CLERK_SECRET_KEY as string
if (!publishableKey || !secretKey) {
    throw new Error("Clerk keys are missing")
}

app.use(clerkMiddleware({ secretKey, publishableKey }))
// app.use(requireAuth())
app.use(cors(corsOptions))

// Middlewares
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(morgan("dev"))

// Health Check
app.get("/api/v1/health", (_, res) => res.send("Api working with /api/v1"))

// Importing Routes
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import orderRouter from './routes/order.routes.js'
import paymentRouter from './routes/payment.routes.js'
import dashboardRouter from './routes/stats.routes.js'
import clerkRoute from './middlewares/clerkWebhook.js'

// route - /api/v1/users/register
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/dashboard", dashboardRouter);
// app.use("https://f662ebeabd71.ngrok-free.app", clerkRoute)

// DB and Caching connection
import { connectDB } from "./config/db.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import { connectToRedis } from "./config/redis.js";
// import { connectToRedis } from './config/redis.js';

connectDB();
connectToRedis();

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})

export default app