import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Product } from "../models/product.models.js";
import {
    BaseQuery,
    CreateProductRequestBody,
    RequestProductQuery
} from "../types/types.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { fileCleanup } from "../utils/fileCleanup.js";
import { cache, invalidateCache } from "../utils/cacheService.js";
import { pagination } from "../utils/pagination.js";
// import { faker } from "@faker-js/faker";


// const baseRedisKey: string = `ecom/products/`
// const deletePreRedisData = () => {
//     return {
//         deleteLatestProducts: async (userId: string) => {
//             try {
//                 await cache.del(`${baseRedisKey}/latest-products/${userId}`)
//             } catch (error) {
//                 console.error("Error while deleting latest Products: ", error)
//             }
//         },
//         deleteAllProducts: async (userId: string) => {
//             try {
//                 await cache.del(`${baseRedisKey}/all-products/${userId}`)
//             } catch (error) {
//                 console.error("Error while deleting latest all products: ", error)
//             }
//         },
//         deleteSingleProduct: async (productId: string) => {
//             try {
//                 await cache.del(`${baseRedisKey}/product/${productId}`)
//             } catch (error) {
//                 console.error("Error while deleting product: ", error)
//             }
//         },
//         deleteAdminProducts: async (userId: string) => {
//             try {
//                 await cache.del(`${baseRedisKey}/admin-products/${userId}`)
//             } catch (error) {
//                 console.error("Error while deleting Admin Products")
//             }
//         }
//     }
// }
// const {
//     deleteAllProducts,
//     deleteLatestProducts,
//     deleteSingleProduct,
//     deleteAdminProducts,
// } = deletePreRedisData();

export const createNewProduct = asyncHandler(
    async (
        req: Request<{}, {}, CreateProductRequestBody>,
        res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errMessages = errors.array().map(e => e.msg)
            throw new ApiError(400, "Validation Error", errMessages)
        }

        const images = (
            Array.isArray(req.files)
                ? req.files : []).map((img: any) => img?.path
                )

        const userId = req.user?._id;
        const { name, brand, category, description, price, stock } = req.body
        const isProductExists = await Product.findOne({ owner: userId, brand, category, name })
        if (isProductExists) {
            images.map((path) => fileCleanup(path))
            throw new ApiError(400, "Product already exists")
        }
        const uploadImages = images.length > 0
            ? await Promise.all(images.map((imgPath: string) =>
                uploadOnCloudinary(imgPath)))
            : [];

        const imagesInfo = uploadImages.length > 0
            ? uploadImages.map((imgInfo: any) => {
                const { public_id, url } = imgInfo;
                return { public_id, image: url };
            })
            : []

        const product = await Product.create({
            owner: userId,
            name,
            brand,
            description,
            category,
            price,
            stock,
            images: imagesInfo
        })

        // const cacheKey = `latest-products`
        // await cache.del(cacheKey)
        // await cache.del("categories")

        await invalidateCache({ product: true })
        return res.status(201).json(
            new ApiResponse(201, product, "Product successfully created")
        )
    })

export const getLatestProducts = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id
    const cacheKey = `latest-products`

    let latestProducts = await cache.get(cacheKey)
    if (latestProducts) {
        return res.status(200).json(
            new ApiResponse(200, latestProducts, "Latest products fetched successfully")
        )
    }
    const filterOptions = req.user?.role === "admin"
        ? {}
        : { owner: userId };

    latestProducts = await Product
        .find(filterOptions)
        .sort({ createdAt: -1 })
        .limit(10);

    cache.set(cacheKey, latestProducts,)
    return res.status(200).json(
        new ApiResponse(200, latestProducts, "Latest products fetched successfully")
    );
})

export const getAllCategories = asyncHandler(async (_: Request, res: Response) => {
    let categories //= //await cache.get("categories")
    // if (categories) {
    //     return res.status(200).json(
    //         new ApiResponse(200, categories, "Categories fetched successfully")
    //     )
    // }

    categories = await Product.distinct("category")
    return res.status(200).json(
        new ApiResponse(200, categories, "Categories fetched successfully")
    );
})

export const getSingleProduct = asyncHandler(async (req: Request, res: Response) => {
    // const cacheKey = `product:${req.params?.id}`;
    let product //= await cache.get(cacheKey);

    // if (product) {
    //     return res.status(200).json(
    //         new ApiResponse(200, product, "Product fetched successfully")
    //     )
    // }

    product = await Product.findById(req.params.id);
    if (!product) throw new ApiError(400, "No product found")
    // await cache.set(cacheKey, product)

    return res.status(200).json(
        new ApiResponse(200, product, "Product fetched successfully")
    )
})

type PaginateQuery = {
    limit?: string,
    page?: string,
    search?: string,
    sort?: "asc" | "desc"
}

export const getAdminProducts = asyncHandler(
    async (req: Request<{}, {}, {}, RequestProductQuery>, res: Response) => {
        const userId = req.user?._id
        const { limit, page, search, sort, category, maxPrice } = req.query;

        const { limit: pageSize, skip } = pagination({
            limit: limit,
            page: page
        })
        const baseQuery: BaseQuery = {}

        if (maxPrice) baseQuery.price = { $lte: maxPrice }
        if (search) baseQuery.name = { $regex: search, $options: "i" }
        if (category) baseQuery.category = category;

        // const cacheKey = `admin-products${userId}`
        let products //= //await cache.get(cacheKey)
        // if (products) {
        //     return res.status(200).json(
        //         new ApiResponse(200, products, "All admin products fetched successfully")
        //     )
        // }

        const productPromise = await Product
            .find({ ...baseQuery, owner: userId })
            .limit(pageSize)
            .skip(skip)
            .sort(sort && {
                price: sort === "asc" ? 1 : -1,
                createdAt: -1
            })
        const [productDocs, productCount] = await Promise.all([
            productPromise,
            Product.countDocuments(baseQuery)
        ])

        if (!productDocs) throw new ApiError(400, "No product not found");

        const totalPages = Math.round(productCount / pageSize)
        // await cache.set(cacheKey, products)
        const resData = {
            totalPages,
            products: productDocs
        }
        return res.status(200).json(
            new ApiResponse(200, resData, "All admin products fetched successfully")
        )
    })

export const getAllProduct = asyncHandler(
    async (req: Request<{}, {}, {}, RequestProductQuery>, res: Response) => {
        const { maxPrice, category, search, sort = "asc" } = req.query;

        const { limit, skip } = pagination({
            limit: req?.query?.limit,
            page: req?.query?.page
        })

        const baseQuery: BaseQuery = {};
        if (maxPrice) baseQuery.price = { $lte: maxPrice }
        if (search) baseQuery.name = { $regex: search, $options: "i" }
        if (category) baseQuery.category = category;

        const productPromise = Product
            .find(baseQuery)
            .sort(sort && { price: sort === "asc" ? 1 : -1 })
            .skip(skip)
            .limit(limit)

        const [products, productCount, categories] = await Promise.all([
            productPromise,
            Product.countDocuments(baseQuery),
            Product.distinct("category")
        ])

        const totalPages = Math.ceil(productCount / limit);

        return res.status(200).json(
            new ApiResponse(
                200,
                { products, totalPages, categories },
                "Product fetched successfully"
            )
        )
    })

export const updateProduct = asyncHandler(
    async (
        req: Request<any>,
        res: Response) => {
        if (!req.body) throw new ApiError(400, "At least one field is required")

        const { name, brand, category, description, price, stock } = req.body
        if (!name && !brand && !category && !description && !price && !stock) {
            throw new ApiError(400, "At least one field is required")
        }
        const product = await Product.findById(req.params.id);
        if (!product) throw new ApiError(400, "No Product found")
        if (name) product.name = name;
        if (description) product.description = description;
        if (brand) product.brand = brand;
        if (category) product.category = category;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (price) product.price = price;

        await product.save();

        // const cacheKey = `product:${req.params?.id}`;
        // await cache.del(cacheKey)
        // await cache.del(`latest-products`)
        // await cache.del("categories")

        return res.status(200).json(
            new ApiResponse(200, product, "Product successfully created")
        )
    })

export const updateProductImages = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    const images = (
        Array.isArray(req.files)
            ? req.files
            : []).map((img: any) => img?.path)

    if (!product) {
        images.map((path) => fileCleanup(path))
        throw new ApiError(400, "No Product found")
    }

    if (product.images?.length > 0) {
        const deleteImages = await Promise.all(
            product.images.map(({ public_id }) =>
                deleteOnCloudinary(public_id))
        )
        if (!deleteImages) {
            throw new ApiError(500, "Error while deleting images from cloudinary")
        }
    }
    const uploadImages = images.length > 0
        ? await Promise.all(images.map((imgPath: string) =>
            uploadOnCloudinary(imgPath)))
        : [];

    const imagesInfo = uploadImages.length > 0
        ? uploadImages.map((imgInfo: any) => {
            const { public_id, url } = imgInfo;
            return { public_id, image: url };
        })
        : []

    product.images = imagesInfo
    await product.save();

    // const cacheKey = `product:${req.params?.id}`;
    // await cache.del(cacheKey)
    // await cache.del(`latest-products`)
    // await cache.del("categories")

    return res.status(200).json(
        new ApiResponse(200, product, "Product images successfully updated")
    )
})

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) throw new ApiError(400, "No product found")

    // const cacheKey = `product:${req.params?.id}`;
    // await cache.del(cacheKey)
    // await cache.del(`latest-products`)
    // await cache.del("categories")
    // await cache.del(`admin-products${req.user?._id}`)
    return res.status(200).json(
        new ApiResponse(200, null, "Product deleted successfully"))
}
)



// faker: Faker Data generate
// export const generateRandomProducts = async (count: number = 10) => {
//     const products = [];

//     for (let i = 0; i < count; i++) {
//         const product = {
//             owner: "sdfasdfasdf",
//             name: faker.commerce.productName(),
//             description: faker.commerce.productDescription(),
//             brand: "uber",
//             Images: [{ image: "../../public/61iryHxlcbL._SL1500_.jpg", public_id: "image" }],
//             price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
//             stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
//             category: faker.commerce.department(),
//             createdAt: new Date(faker.date.past()),
//             updatedAt: new Date(faker.date.recent()),
//             _v: 0,
//         }
//         products.push(product)
//     }
//     await Product.create(products)
//     console.log({ success: true })
// }

// generateRandomProducts(200)


// const deleteRandomProducts = async (count: number = 10) => {
//     const products = await Product.find({}).skip(2);

//     for (let i = 0; i < count; i++) {
//         const product = products[i];
//         await product.deleteOne();
//     }
//     console.log({ success: true })
// }

// deleteRandomProducts(200)

