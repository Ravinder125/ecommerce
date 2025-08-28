import { Router } from 'express'
import { adminOnly } from '../middlewares/auth.middleware.js';
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
import { createProduct } from '../middlewares/validators/productValidator.middleware.js';

const router = Router();



router
    .route("/")
    .post(
        adminOnly,
        upload.array("image", 5),
        createProduct,
        createNewProduct
    )
    .get(getAllProduct)

router.route("/admin").get(adminOnly, getAdminProducts)
router.route("/latest").get(adminOnly, getLatestProducts)
router.route("/categories").get(getAllCategories)
router
    .route("/:id")
    .get(adminOnly, getSingleProduct)
    .put(adminOnly, updateProduct)
    .patch(adminOnly, upload.array("image", 5), updateProductImages)
    .delete(adminOnly, deleteProduct)

export default router;

