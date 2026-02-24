import { createApi } from "@reduxjs/toolkit/query/react"
import type { ApiResponse, GetProductResponse, GetProductsQuery } from "../../types/api.type"
import { apiPaths } from "../../utils/apiPath"
import { getToken } from "../../utils/tokenManager"
import { baseQueryWithClerk } from "./baseQueryWithAuth"
import type { NewProductFormData, Product } from "../../types/product.type"


export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: baseQueryWithClerk(getToken),
  tagTypes: ["Product"],

  endpoints: (builder) => ({

    // CREATE
    createProduct: builder.mutation<ApiResponse<null>, NewProductFormData>({
      query: (product) => ({
        url: apiPaths.products.root,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    // DELETE
    deleteProduct: builder.mutation<ApiResponse<null>, string>({
      query: (productId) => ({
        url: `${apiPaths.products.root}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // GET ALL
    allProducts: builder.query<ApiResponse<GetProductResponse>, GetProductsQuery>({
      query: ({
        category = "all",
        maxPrice = 1000000,
        page = 1,
        search = "",
        sort = "asc",
        limit = 10,
      }) => ({
        url: `${apiPaths.products.root}/?search=${search}&category=${category}&page=${page}&maxPrice=${maxPrice}&sort=${sort}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // GET LATEST
    latestProducts: builder.query<ApiResponse<Product[]>, void>({
      query: () => ({
        url: apiPaths.products.latest,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // GET ADMIN PRODUCTS
    adminProducts: builder.query<ApiResponse<Product[]>, void>({
      query: () => ({
        url: apiPaths.products.admin,
        method: "GET"
      })
    }),
    productCategories: builder.query<ApiResponse<string[]>, void>({
      query: () => ({
        url: apiPaths.products.categories,
        method: "GET"
      })
    })
  })
})

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useAllProductsQuery,
  useLatestProductsQuery,
  useAdminProductsQuery,
  useProductCategoriesQuery,
} = productAPI