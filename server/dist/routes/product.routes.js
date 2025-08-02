import { Router } from 'express';
import { adminOnly } from '../middlewares/auth.middleware.js';
import { createNewProduct, deleteProduct, getAdminProducts, getAllCategories, getAllProduct, getLatestProducts, getSingleProduct, updateProduct, updateProductImages } from '../controllers/product.controller.js';
import { body } from 'express-validator';
import { upload } from '../middlewares/multer.middleware.js';
const router = Router();
router
    .route("/")
    .post(adminOnly, upload.array("image", 5), [
    body("name")
        .notEmpty().withMessage("Product name is required")
        .isString().withMessage("Product name must be string ")
        .isLength({ max: 200 }).withMessage("Product name cannot exceed 120 characters"),
    body("description")
        .notEmpty().withMessage("description is Required")
        .isString().withMessage("Product description must be a string "),
    body("price")
        .notEmpty().withMessage("Product price is required")
        .isNumeric().withMessage("Product price must be a number")
        .isLength({ max: 999999, min: 0 }).withMessage("Product price can neither exceed 6 digit nor be negative "),
    body("brand")
        .notEmpty().withMessage("Product brand is required")
        .isString().withMessage("Product brand must be a string "),
    body("category")
        .notEmpty().withMessage("Product category is required")
        .isString().withMessage("Product category must be string "),
    body("stock")
        .notEmpty().withMessage("Product stock is required")
        .isNumeric().withMessage("Product stock must be a number")
        .isLength({ max: 999999, min: 0 }).withMessage("Product stock can neither exceed 6 digit nor be negative"),
], createNewProduct)
    .get(getAllProduct);
router.route("/admin/").get(adminOnly, getAdminProducts);
router.route("/latest").get(adminOnly, getLatestProducts);
router.route("/categories").get(getAllCategories);
router
    .route("/:id")
    .get(adminOnly, getSingleProduct)
    .put(adminOnly, updateProduct)
    .patch(adminOnly, upload.array("image"), updateProductImages)
    .delete(adminOnly, deleteProduct);
export default router;
