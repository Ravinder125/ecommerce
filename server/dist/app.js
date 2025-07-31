import express from "express";
const port = 5000;
const app = express();
// Importing Routes
import userRouter from './routes/user.routes.js';
// route - /api/v1/users/register
app.use("/api/v1/users", userRouter);
app.listen(port, () => {
    console.log(`Server is listing on http://localhost:${port}`);
});
