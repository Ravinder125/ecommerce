import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { ApiResponse, GetProductResponse, GetProductsQuery } from "../../types/api.type"
import type { Product } from "../../types/product.type"
import { apiPaths } from "../../utils/apiPath"
import type { NewProductFormData, UpdateProductFormData } from "../../validations/productDataSchema"


export type AdminGetResponse = Omit<GetProductResponse, "categories">
export type GetProductQuery = Product & { description: string }
export type UpdateProductQuery = UpdateProductFormData & { id: string }
export type UploadProductImagesQuery = {
  images: File[];
  id: string;
}


export const baseUrl = import.meta.env.VITE_BASE_URL

if (!baseUrl) {
  throw new Error("Base url is missing")
}

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  tagTypes: ["Product"],

  endpoints: (builder) => ({

    // CREATE
    createProduct: builder.mutation<ApiResponse<Product>, NewProductFormData>({
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
      query: () => {
        console.log("working")
        return {
          url: apiPaths.products.latest,
          method: "GET"
        }
      }
    }),

    // GET ADMIN PRODUCTS
    adminProducts: builder.query<ApiResponse<AdminGetResponse>, GetProductsQuery>({
      query: ({
        category = "",
        maxPrice = 1000000,
        page = 1,
        search = "",
        sort = "asc",
        limit = 10,
      }) => ({
        url: `${apiPaths.products.admin}?search=${search}&category=${category}&page=${page}&maxPrice=${maxPrice}&sort=${sort}&limit=${limit}`,
        method: "GET"
      })
    }),

    productCategories: builder.query<ApiResponse<string[]>, void>({
      query: () => ({
        url: apiPaths.products.categories,
        method: "GET"
      })
    }),

    getProduct: builder.query<ApiResponse<Product>, string>({
      query: (productId) => ({
        url: `${apiPaths.products.byId(productId)}`
      })
    }),

    updateProduct: builder.mutation<ApiResponse<GetProductQuery>, UpdateProductQuery>({
      query: (product) => ({
        url: apiPaths.products.byId(product.id),
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"]
    }),

    uploadProductImages: builder.mutation<ApiResponse<null>, UploadProductImagesQuery>({
      query: (data) => {
        const formData = new FormData()

        data.images.forEach((img) => {
          formData.append("image", img)
        })

        return {
          url: apiPaths.products.byId(data.id),
          method: "PATCH",
          body: formData
        }
      },
      invalidatesTags: ["Product"]
    }),
  })

})

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useAllProductsQuery,
  useLatestProductsQuery,
  useAdminProductsQuery,
  useProductCategoriesQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useUploadProductImagesMutation,
} = productAPI