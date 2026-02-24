import type { Product } from "./product.type";

export type ApiPaths = {
  // auth: {
  //   profile: string;
  // };

  users: {
    syncProfile: string;
    profile: string;
    allUsers: string;
    byId: (id: string) => string;
  };

  products: {
    root: string;
    admin: string;
    latest: string;
    categories: string;
    byId: (id: string) => string;
    updateImages: (id: string) => string;
  };

  orders: {
    root: string;
    admin: string;
    byId: (id: string) => string;
  };

  coupons: {
    root: string;
    byId: (id: string) => string;
    applyDiscount: string;
  };

  dashboard: {
    stats: string;
    pie: string;
    bar: string;
    line: string;
  };

  payments: {
    root: string;
  };
};


export interface ApiResponse<T = null> {
  success: boolean;
  message?: string;
  data: T;
}


export type GetProductsQuery = {
  page?: number,
  search?: string,
  totalPages?: string,
  sort?: string,
  category?: string,
  maxPrice?: number,
  limit?: number,
}

export type GetProductResponse = GetProductsQuery
  & {
    products: Product[]
    categories: string[]
  }

export type Sort = "asc" | "desc"
