import { validationResult } from "express-validator";
import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { fileCleanup } from "../utils/fileCleanup.js";
export const createNewProduct = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errMessages = errors.array().map(e => e.msg);
        throw new ApiError(400, "Validation Error", errMessages);
    }
    const images = (Array.isArray(req.files)
        ? req.files : []).map((img) => img?.path);
    const userId = req.user?._id;
    const { name, brand, category, description, price, stock } = req.body;
    const isProductExists = await Product.findOne({ owner: userId, brand, category, name });
    if (isProductExists) {
        images.map((path) => fileCleanup(path));
        throw new ApiError(400, "Product already exists");
    }
    const uploadImages = images.length > 0
        ? await Promise.all(images.map((imgPath) => uploadOnCloudinary(imgPath)))
        : [];
    const imagesInfo = uploadImages.length > 0
        ? uploadImages.map((imgInfo) => {
            const { public_id, url } = imgInfo;
            return { public_id, image: url };
        })
        : [];
    const product = await Product.create({
        owner: userId,
        name,
        brand,
        description,
        category,
        price,
        stock,
        images: imagesInfo
    });
    return res.status(201).json(new ApiResponse(201, product, "Product successfully created"));
});
export const getLatestProducts = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const filterOptions = req.user?.role === "admin"
        ? {}
        : { owner: userId };
    const latestProducts = await Product
        .find(filterOptions)
        .sort({ createdAt: -1 })
        .limit(10);
    return res.status(200).json(new ApiResponse(200, latestProducts, "Latest products fetched successfully"));
});
export const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Product.distinct("category");
    return res.status(200).json(new ApiResponse(200, categories, "Categories fetched successfully"));
});
export const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product)
        throw new ApiError(400, "No product found");
    return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
});
export const getAllProduct = asyncHandler(async (req, res) => {
    const filterOptions = req.user?.role === "admin"
        ? { owner: req.user._id, }
        : {};
    const product = await Product.find(filterOptions);
    return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
});
export const updateProduct = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errMessages = errors.array().map(e => e.msg);
        throw new ApiError(400, "Validation Error", errMessages);
    }
    if (!req.body)
        throw new ApiError(400, "At least one field is required");
    const { name, brand, category, description, price, stock } = req.body;
    if (!name && !brand && !category && !description && !price && !stock) {
        throw new ApiError(400, "At least one field is required");
    }
    const product = await Product.findById(req.params.id);
    if (!product)
        throw new ApiError(400, "No Product found");
    if (name)
        product.name = name;
    if (description)
        product.description = description;
    if (brand)
        product.brand = brand;
    if (category)
        product.category = category;
    if (price)
        product.price = price;
    if (stock)
        product.stock = stock;
    if (price)
        product.price = price;
    await product.save();
    return res.status(200).json(new ApiResponse(200, product, "Product successfully created"));
});
export const updateProductImages = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const images = (Array.isArray(req.files)
        ? req.files
        : []).map((img) => img?.path);
    if (!product) {
        images.map((path) => fileCleanup(path));
        throw new ApiError(400, "Product already exists");
    }
    if (product.images?.length > 0) {
        const deleteImages = await Promise.all(product.images.map(({ public_id }) => deleteOnCloudinary(public_id)));
        if (!deleteImages) {
            throw new ApiError(500, "Error while deleting images from cloudinary");
        }
    }
    const uploadImages = images.length > 0
        ? await Promise.all(images.map((imgPath) => uploadOnCloudinary(imgPath)))
        : [];
    const imagesInfo = uploadImages.length > 0
        ? uploadImages.map((imgInfo) => {
            const { public_id, url } = imgInfo;
            return { public_id, image: url };
        })
        : [];
    product.images = imagesInfo;
    await product.save();
    return res.status(200).json(new ApiResponse(200, product, "Product images successfully updated"));
});
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
        throw new ApiError(400, "No product found");
    return res.status(200).json(new ApiResponse(200, null, "Product deleted successfully"));
});
