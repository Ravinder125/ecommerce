import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../../types/api.type";
import type { NewOrder, Order, PaymentInfo, PaymentMethod } from "../../types/transaction.type";
import { apiPaths } from "../../utils/apiPath";

export const baseUrl = import.meta.env.VITE_BASE_URL

if (!baseUrl) {
    throw new Error("Base url is missing")
}

export type CreateOrderRequest = NewOrder & {
    paymentMethod: PaymentMethod
    paymentInfo: PaymentInfo
}

export type TableOrder = {
    _id: string;
    total: number;
    quantity: number;
    discount: number;
    orderStatus: string;
}

export const transactionAPI = createApi({
    reducerPath: "transactionAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ["Transactions"],

    endpoints: (builder) => ({

        // Create Order
        createOrder: builder.mutation<ApiResponse, CreateOrderRequest>({
            query: (order) => ({
                url: apiPaths.orders.root,
                method: "POST",
                body: order,
            }),
            invalidatesTags: ["Transactions"]
        }),

        adminOrders: builder.query<ApiResponse<Order[]>, void>({
            query: () => ({
                url: apiPaths.orders.admin,
                method: "GET"
            }),
        }),

        getOrder: builder.query<ApiResponse<Order>, string>({
            query: (orderId) => ({
                url: apiPaths.orders.byId(orderId),
                method: "GET"
            })
        }),

        orders: builder.query<ApiResponse<TableOrder[]>, void>({
            query: () => ({
                url: apiPaths.orders.root,
                method: "GET"
            })
        }),

        processOrder: builder.mutation<ApiResponse, { orderId: string, isCancelled?: boolean }>({
            query: ({ orderId, isCancelled }) => ({
                url: `${apiPaths.orders.byId(orderId)}?isCancelled=${isCancelled}`,
                method: "PUT"
            }),
            invalidatesTags: ["Transactions"]
        }),

    })
})

export const {
    useCreateOrderMutation,
    useAdminOrdersQuery,
    useGetOrderQuery,
    useProcessOrderMutation,
    useOrdersQuery,
} = transactionAPI