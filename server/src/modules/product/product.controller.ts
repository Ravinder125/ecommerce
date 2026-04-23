import { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { productService } from "./product.service.js";
import {
  CreateProductRequestBody,
  RequestProductQuery,
} from "./product.types.js";

export const createNewProduct = asyncHandler(
  async (req: Request<{}, {}, CreateProductRequestBody>, res: Response) => {
    const userId = req.user?._id;
    const newProduct = await productService.createProduct({
      userId,
      files: req.files!,
      productData: req.body,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newProduct, "Product successfully created"));
  },
);

export const getLatestProducts = asyncHandler(
  async (_: Request, res: Response) => {
    const latestProducts = await productService.latestProducts();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          latestProducts,
          "Latest products fetched successfully",
        ),
      );
  },
);

export const getAllCategories = asyncHandler(
  async (_: Request, res: Response) => {
    const categories = await productService.categoriesList();

    return res
      .status(200)
      .json(
        new ApiResponse(200, categories, "Categories fetched successfully"),
      );
  },
);

export const getSingleProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.findProduct(req.params.id);

    return res
      .status(200)
      .json(new ApiResponse(200, product, "Product fetched successfully"));
  },
);

export const getAdminProducts = asyncHandler(
  async (req: Request<{}, {}, {}, RequestProductQuery>, res: Response) => {
    const { products, page, totalPages } = await productService.findAllProducts(
      {
        queryParams: req.query,
        userId: req.user?._id,
        role: "admin",
      },
    );
    if (!products) throw new ApiError(400, "No product not found");

    const resData = {
      totalPages,
      page,
      products,
    };

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          resData,
          "All admin products fetched successfully",
        ),
      );
  },
);

export const getAllProduct = asyncHandler(
  async (req: Request<{}, {}, {}, RequestProductQuery>, res: Response) => {
    const [productDataWithCount, categories] = await Promise.all([
      productService.findAllProducts({
        queryParams: req.query,
        userId: req.user?._id,
        role: "user",
      }),
      productService.categoriesList(),
    ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          products: productDataWithCount.products,
          totalPages: productDataWithCount.totalPages,
          categories,
        },
        "Product fetched successfully",
      ),
    );
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.body) throw new ApiError(400, "At least one field is required");

    const updated = await productService.updateProduct(req.params.id, req.body);

    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Product successfully created"));
  },
);

export const updateProductImages = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id;

    const updated = await productService.uploadProductImages(
      productId,
      req.files!,
    );

    return res
      .status(200)
      .json(
        new ApiResponse(200, updated, "Product images successfully updated"),
      );
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    await productService.deleteProduct(req.params.id);

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Product deleted successfully"));
  },
);
