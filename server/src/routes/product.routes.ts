import { Router } from 'express';
import {
    createNewProduct,
    deleteProduct,
    getAdminProducts,
    getAllCategories,
    getAllProduct,
    getLatestProducts,
    getSingleProduct,
    updateProduct,
    updateProductImages
} from '../controllers/product.controller.js';
import { adminOnly } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { validateRequest } from '../middlewares/validateRequest.middleware.js';
import { createProductSchema, updateProductSchema } from '../validators/productValidator.middleware.js';

const router = Router();

router
    .route("/")
    .post(
        adminOnly,
        upload.array("image", 5),
        createProductSchema,
        validateRequest,
        createNewProduct
    )
    .get(getAllProduct)

router.route("/admin").get(adminOnly, getAdminProducts)
router.route("/latest").get(getLatestProducts)
router.route("/categories").get(getAllCategories)
router
    .route("/:id")
    .get( getSingleProduct)
    .put(adminOnly, updateProductSchema, validateRequest, updateProduct)
    .patch(adminOnly, upload.array("image"), updateProductImages)
    .delete(adminOnly, deleteProduct)

export default router;

