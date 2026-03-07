// import { createApi } from "@reduxjs/toolkit/query/react"
// import type { ApiResponse, GetProductResponse, GetProductsQuery } from "../../types/api.type"
// import { apiPaths } from "../../utils/apiPath"
// import { getToken } from "../../utils/tokenManager"
// import { baseQueryWithClerk } from "./baseQueryWithAuth"
// import type { Product } from "../../types/product.type"
// import type { NewProductFormData, UpdateProductFormData } from "../../validations/productDataSchema"


// export const orderAPI = createApi({
//     reducerPath: "orderAPI",
//     baseQuery: baseQueryWithClerk(getToken),
//     tagTypes: ["Order"],

//     endpoints: (builder) => ({

//         // CREATE
//         createProduct: builder.mutation<ApiResponse<Product>, NewProductFormData>({
//             query: (product) => ({
//                 url: apiPaths.products.root,
//                 method: "POST",
//                 body: product,
//             }),
//             invalidatesTags: ["Order"],
//         }),

//         // DELETE
//         deleteProduct: builder.mutation<ApiResponse<null>, string>({
//             query: (productId) => ({
//                 url: `${apiPaths.products.root}/${productId}`,
//                 method: "DELETE",
//             }),
//             invalidatesTags: ["Order"],
//         }),

//         // GET ALL
//         allProducts: builder.query<ApiResponse<GetProductResponse>, GetProductsQuery>({
//             query: ({
//                 category = "all",
//                 maxPrice = 1000000,
//                 page = 1,
//                 search = "",
//                 sort = "asc",
//                 limit = 10,
//             }) => ({
//                 url: `${apiPaths.products.root}/?search=${search}&category=${category}&page=${page}&maxPrice=${maxPrice}&sort=${sort}&limit=${limit}`,
//                 method: "GET",
//             }),
//             providesTags: ["Order"],
//         }),

//         // GET LATEST
//         latestProducts: builder.query<ApiResponse<Product[]>, void>({
//             query: () => ({
//                 url: apiPaths.products.latest,
//                 method: "GET",
//             }),
//             providesTags: ["Order"],
//         }),

//         // GET ADMIN PRODUCTS
//         adminProducts: builder.query<ApiResponse<AdminGetResponse>, GetProductsQuery>({
//             query: ({
//                 category = "all",
//                 maxPrice = 1000000,
//                 page = 1,
//                 search = "",
//                 sort = "asc",
//                 limit = 10,
//             }) => ({
//                 url: `${apiPaths.products.admin}?search=${search}&category=${category}&page=${page}&maxPrice=${maxPrice}&sort=${sort}&limit=${limit}`,
//                 method: "GET"
//             })
//         }),

//         productCategories: builder.query<ApiResponse<string[]>, void>({
//             query: () => ({
//                 url: apiPaths.products.categories,
//                 method: "GET"
//             })
//         }),

//         getProduct: builder.query<ApiResponse<Product>, string>({
//             query: (productId) => ({
//                 url: `${apiPaths.products.byId(productId)}`
//             })
//         }),

//         updateProduct: builder.mutation<ApiResponse<GetProductQuery>, UpdateProductQuery>({
//             query: (product) => ({
//                 url: apiPaths.products.byId(product.id),
//                 method: "PUT",
//                 body: product,
//             }),
//             invalidatesTags: ["Order"]
//         }),

//         uploadProductImages: builder.mutation<ApiResponse<null>, UploadProductImagesQuery>({
//             query: (data) => {
//                 const formData = new FormData()

//                 data.images.forEach((img) => {
//                     formData.append("image", img)
//                 })

//                 return {
//                     url: apiPaths.products.byId(data.id),
//                     method: "PATCH",
//                     body: formData
//                 }
//             },
//             invalidatesTags: ["Order"]
//         }),
//     })

// })

// export const {

// } = orderAPI