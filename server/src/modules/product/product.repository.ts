import { HydratedDocument } from "mongoose";
import { Product } from "./product.model.js";
import {
  CreateProduct,
  IProduct,
  ObjectId,
  ProductImagesInfo,
  RequestProductQuery,
  UpdateProduct,
} from "./product.types.js";

type FindOneProduct = {
  owner: ObjectId;
  brand: string;
  category: string;
  name: string;
};

interface IProductRepository {
  create(productData: CreateProduct): Promise<IProduct>;
  findProduct(data: FindOneProduct): Promise<IProduct | null>;
  findById(id: ObjectId): Promise<IProduct | null>;
  updateById(id: ObjectId, updateData: UpdateProduct): Promise<IProduct | null>;
  deletedById(id: ObjectId): Promise<boolean>;
  uploadImages(
    id: ObjectId,
    images: ProductImagesInfo[],
  ): Promise<IProduct | null>;
  findProducts(
    queryParams: RequestProductQuery,
    extraFilter: any,
  ): Promise<IProduct[]>;
  latest(): Promise<IProduct[]>;
  categories(): Promise<string[]>;
  admin(id: ObjectId): Promise<IProduct[]>;
  countDocs(query?: object): Promise<number>;
  hydrateDoc(doc: IProduct): Promise<HydratedDocument<IProduct>>;
}

export const productRepository: IProductRepository = {
  async create(productData) {
    return Product.create(productData);
  },

  async findById(id) {
    return Product.findById(id);
  },

  async findProduct(data) {
    return Product.findOne(data);
  },

  async latest() {
    return await Product.find().sort({ createdAt: -1 }).limit(10).lean();
  },

  async findProducts(queryParams, baseFilter = {}) {
    const page = Number(queryParams.page) || 1;
    const limit = Number(queryParams.limit) || 10;
    const skip = (page - 1) * limit;

    let query = Product.find(baseFilter);

    // 🔍 SEARCH
    if (queryParams.search) {
      const regex = {
        $regex: queryParams.search,
        $options: "i",
      };

      query = query.find({
        $or: [{ name: regex }, { brand: regex }],
      });
    }

    // 🔃 SORT
    if (queryParams.sort) {
      const sortBy = queryParams.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // 📄 PAGINATION
    query = query.skip(skip).limit(limit);

    return query;
  },

  async admin(id) {
    return Product.find({ owner: id });
  },

  async deletedById(id) {
    const result = await Product.deleteOne({ _id: id });
    return result.deletedCount === 1;
  },

  async updateById(id, updateData) {
    return Product.findByIdAndUpdate(id, updateData, { new: true });
  },

  async uploadImages(id, images) {
    return Product.findByIdAndUpdate(id, { images: images });
  },

  async categories() {
    return Product.find().distinct("category");
  },

  async countDocs(query = {}) {
    return Product.countDocuments(query);
  },

  async hydrateDoc(doc) {
    return Product.hydrate(doc);
  },
};
