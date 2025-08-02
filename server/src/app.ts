import express from "express";
import dotenv from 'dotenv'
import morgan from 'morgan'
import compression from 'compression'

dotenv.config()
const app = express();

// Middlewares
app.use(express.json())
// app.use(express.urlencoded())
app.use(morgan("dev"))
app.use(compression({ threshold: 1024 }))

// Health Check
app.get("/api/v1/health", (_, res) => res.send("Api working with /api/v1"))

// Importing Routes
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'

// route - /api/v1/users/register
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

// DB connection
import { connectDB } from "./config/db.js";
connectDB()
    .then(() => console.log("DB is connected"))
    .catch((e) => console.error("DB Connection failed", e.message));


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})

export default app