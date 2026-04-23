import mongoose from "mongoose";
import { UserRole } from "../../types/types.js";

export type ObjectId = mongoose.Types.ObjectId;
export type ProductImagesInfo = {
  public_id: string;
  image: string;
};

export type CreateProduct = {
  owner: ObjectId;
  name: string;
  brand: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  images: ProductImagesInfo[];
};

export type UpdateProduct = {
  name?: string;
  brand?: string;
  category?: string;
  description?: string;
  price?: number;
  stock?: number;
};

export type RequestProductQuery = {
  maxPrice?: string;
  search?: string;
  category?: string;
  sort?: "asc" | "desc";
  page?: string;
  minPrice?: string;
  limit?: string;
};

export interface CreateProductRequestBody {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
}

export interface IReview {
  user: ObjectId;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface IProduct extends mongoose.Document {
  owner: ObjectId;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  stock: number;
  sold: number;
  images: ProductImagesInfo[];
  ratings: number;
  numOfReviews: number;
  reviews: IReview[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProductServiceProps = {
  userId: string;
  files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
  productData: Omit<CreateProduct, "owner" | "images">;
};

export type FindAllProductServiceProps = {
  queryParams: RequestProductQuery;
  userId: string;
  role: UserRole;
};

export type FindAllProductServiceReturn = {
  products: IProduct[];
  totalPages: number;
  page: number;
};
