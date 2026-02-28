import { Router } from 'express'
import { adminOnly, authMiddleware } from '../middlewares/auth.middleware.js';
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
import { upload } from '../middlewares/multer.middleware.js';
import { createProductSchema, updateProductSchema } from '../validators/productValidator.middleware.js';
import { validateRequest } from '../middlewares/validateRequest.middleware.js';

const router = Router();
router.use(authMiddleware)

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
router.route("/latest").get(adminOnly, getLatestProducts)
router.route("/categories").get(getAllCategories)
router
    .route("/:id")
    .get(adminOnly, getSingleProduct)
    .put(adminOnly, updateProductSchema, validateRequest, updateProduct)
    .patch(adminOnly, upload.array("image", 5), updateProductImages)
    .delete(adminOnly, deleteProduct)

export default router;

