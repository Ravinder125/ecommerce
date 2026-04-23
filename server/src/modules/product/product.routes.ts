import { Router } from "express";
import {
  createNewProduct,
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProduct,
  getLatestProducts,
  getSingleProduct,
  updateProduct,
  updateProductImages,
} from "./product.controller.js";
import {
  adminOnly,
  protect,
  syncUser,
} from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../../validators/productValidator.middleware.js";

const router = Router();

router
  .route("/")
  .post(
    protect,
    syncUser,
    adminOnly,
    upload.array("image", 5),
    createProductSchema,
    validateRequest,
    createNewProduct,
  )
  .get(getAllProduct);

router.route("/admin").get(protect, syncUser, adminOnly, getAdminProducts);
router.route("/latest").get(getLatestProducts);
router.route("/categories").get(getAllCategories);
router
  .route("/:id")
  .get(getSingleProduct)
  .put(
    protect,
    syncUser,
    adminOnly,
    updateProductSchema,
    validateRequest,
    updateProduct,
  )
  .patch(
    protect,
    syncUser,
    adminOnly,
    upload.array("image"),
    updateProductImages,
  )
  .delete(protect, syncUser, adminOnly, deleteProduct);

export default router;
