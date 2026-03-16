import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithClerk } from "./baseQueryWithAuth";
import { getToken } from "../../utils/tokenManager";
import type { ApiResponse } from "../../types/api.type";
import { apiPaths } from "../../utils/apiPath";
import type { NewOrder, Order, PaymentInfo, PaymentMethod } from "../../types/transaction.type";

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
    baseQuery: baseQueryWithClerk(getToken),
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