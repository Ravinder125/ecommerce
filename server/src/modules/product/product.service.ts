import { UserRole } from "../../types/types.js";
import { ApiError } from "../../utils/ApiError.js";
import { cache, invalidateCache } from "../../utils/cacheService.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { fileCleanup } from "../../utils/fileCleanup.js";
import { isValidId, toObjectId } from "../../utils/mongoUtils.js";
import { productRepository } from "./product.repository.js";
import {
  CreateProductServiceProps,
  FindAllProductServiceProps,
  FindAllProductServiceReturn,
  IProduct,
  ProductImagesInfo,
  RequestProductQuery,
  UpdateProduct,
} from "./product.types.js";

export const productKeys = {
  categories: "categories",

  allProducts({
    role,
    userId,
    queryParams,
  }: {
    role: UserRole;
    userId: string;
    queryParams: RequestProductQuery;
  }) {
    return `products:${role}:${userId}:${JSON.stringify(queryParams)}`;
  },

  latestProducts: "latests-products",
};

const getProductWithImageUrl = (products: IProduct[]): any => {
  if (products.length === 0) {
    throw new ApiError(400, "No product images found");
  }
  const withUrl = products.map((p: IProduct) => {
    return {
      ...p.toObject(),
      images: p.images?.map((i: ProductImagesInfo) => i.image),
    };
  });

  return withUrl;
};

interface IProductService {
  createProduct({
    userId,
    files,
    productData,
  }: CreateProductServiceProps): Promise<IProduct>;
  findProduct(id: string): Promise<IProduct>;
  updateProduct(id: string, updateData: UpdateProduct): Promise<IProduct>;
  deleteProduct(id: string): Promise<boolean>;
  uploadProductImages(
    id: string,
    files:
      | Express.Multer.File[]
      | { [fieldname: string]: Express.Multer.File[] },
  ): Promise<IProduct>;
  findAllProducts({
    queryParams,
    userId,
    role,
  }: FindAllProductServiceProps): Promise<FindAllProductServiceReturn>;
  latestProducts(): Promise<IProduct[]>;
  categoriesList(): Promise<string[]>;
  countProducts(query?: object): Promise<number>;
  // adminProducts(id: string): Promise<IProduct[]>;
}

export const productService: IProductService = {
  async createProduct({ userId, files, productData }) {
    const imagePaths = (Array.isArray(files) ? files : []).map(
      (img: any) => img?.path,
    );

    if (imagePaths?.length === 0)
      throw new ApiError(400, "Images are required");

    const { brand, category, description, name, price, stock } = productData;

    if (!isValidId(userId)) throw new ApiError(400, "Invalid product ID");

    const ownerId = toObjectId(userId);

    const isProductExists = await productRepository.findProduct({
      owner: ownerId,
      brand: brand,
      category: category,
      name: name,
    });

    if (isProductExists) {
      imagePaths.forEach((path) => fileCleanup(path));
      throw new ApiError(400, "Product already exists");
    }

    const uploadImages =
      imagePaths.length > 0
        ? await Promise.all(
            imagePaths.map((imgPath: string) => uploadOnCloudinary(imgPath)),
          )
        : [];

    const imageList =
      uploadImages.length > 0
        ? uploadImages.map((imgInfo: any) => {
            const { public_id, url } = imgInfo;
            return { public_id, image: url };
          })
        : [];

    const product = await productRepository.create({
      owner: ownerId,
      name: name,
      brand: brand,
      description: description,
      category: category,
      price: price,
      stock: stock,
      images: imageList,
    });

    await cache.del("latest-products");
    await cache.del("categories");

    await invalidateCache({ product: true });

    return product;
  },

  async findProduct(id) {
    if (!isValidId(id)) {
      throw new ApiError(400, "Invalid Product ID");
    }

    const productId = toObjectId(id);

    const product = await productRepository.findById(productId);

    if (!product) throw new ApiError(404, "No product found");

    return getProductWithImageUrl([product])[0];
  },

  async categoriesList() {
    let categories = await cache.get(productKeys.categories);
    if (categories?.length >= 1) {
      return categories;
    }

    categories = await productRepository.categories();
    return categories;
  },

  async findAllProducts({ queryParams, userId, role }) {
    let filter: any = {};
    if (role === "admin") filter.owner = userId;

    if (queryParams.maxPrice)
      filter.price = {
        $lte: Number(queryParams.maxPrice),
      };

    if (queryParams.category) {
      filter.categories = queryParams.category;
    }

    await cache.del(
      productKeys.allProducts({ role, userId, queryParams: filter }),
    );

    const cachedProducts = await cache.get(
      productKeys.allProducts({
        role,
        queryParams: queryParams,
        userId,
      }),
    );

    if (cachedProducts?.length >= 1) {
      return cachedProducts;
    }

    const [products, total] = await Promise.all([
      productRepository.findProducts(queryParams, filter),
      productRepository.countDocs(filter),
    ]);

    // const products = await productRepository.findProducts(query, filter);
    const formatted = getProductWithImageUrl(products);
    const limit = Number(queryParams.limit) || 10;

    return {
      products: formatted,
      totalPages: Math.ceil(total / limit),
      page: Number(queryParams.page) || 1,
    };
  },

  async deleteProduct(id) {
    const productId = toObjectId(id);

    const result = productRepository.deletedById(productId);
    if (!result) throw new ApiError(404, "No product found");

    return result;
  },

  async latestProducts() {
    let latests = await cache.get(productKeys.latestProducts);
    if (latests?.length >= 1) {
      return latests;
    }

    latests = await productRepository.latest();
    const products = getProductWithImageUrl(latests);
    await cache.set(productKeys.latestProducts, latests);
    return products;
  },

  async updateProduct(id, updateData) {
    if (!isValidId(id)) throw new ApiError(400, "Invalid product ID");
    const productId = toObjectId(id);

    const { name, brand, category, description, price, stock } = updateData;

    const product = await productRepository.findById(productId);
    if (!product) throw new ApiError(404, "No product found");

    const updated = await productRepository.hydrateDoc(product);

    if (name) updated.name = name;
    if (description) updated.description = description;
    if (brand) updated.brand = brand;
    if (category) updated.category = category;
    if (price) updated.price = price;
    if (stock) updated.stock = stock;
    if (price) updated.price = price;

    await updated.save({ validateModifiedOnly: true });

    await invalidateCache({ product: true });
    return updated;
  },

  async uploadProductImages(id, files = []) {
    const imagePaths = (Array.isArray(files) ? files : []).map(
      (img: any) => img?.path,
    );

    if (imagePaths.length === 0) {
      throw new ApiError(400, "Images are required");
    }
    if (!isValidId(id)) throw new ApiError(400, "Invalid ID");
    const productId = toObjectId(id);

    const product = await productRepository.findById(productId);
    if (!product) {
      const deletedPaths = imagePaths.map((path) => fileCleanup(path));

      if (!deletedPaths) {
        throw new ApiError(500, "Error while deleting images from cloudinary");
      }

      throw new ApiError(404, "No product found");
    }

    const uploadImages = await Promise.all(
      imagePaths.map((imgPath: string) => uploadOnCloudinary(imgPath)),
    );

    if (uploadImages.length === 0)
      throw new ApiError(500, "Image upload on cloudinary failed");

    const imagesInfo = uploadImages.map((imgInfo: any) => {
      const { public_id, url } = imgInfo;
      return { public_id, image: url };
    });
    const hydratedDoc = await productRepository.hydrateDoc(product);
    hydratedDoc.images = imagesInfo;
    await hydratedDoc.save({ validateModifiedOnly: true });

    await invalidateCache({ product: true });

    return hydratedDoc;
  },

  async countProducts(query) {
    return await productRepository.countDocs(query);
  },
};
