import express from "express";
import userRoutes from "../../modules/user/user.routes.js";
import productRoutes from "../../modules/product/product.routes.js";

const app = express();

app.use(express.json());

app.use((req: any, _, next) => {
  req.user = {
    _id: "507f1f77bcf86cd799439011",
    role: "admin",
    firebaseUID: "test-firebase-uid",
  };
  next();
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);

export default app;
