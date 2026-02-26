import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithClerk } from "./baseQueryWithAuth";
import { getToken } from "../../utils/tokenManager";
import type { ApiResponse } from "../../types/api.type";
import { apiPaths } from "../../utils/apiPath";
import type { Order } from "../../types/transaction.type";

export const transactionAPI = createApi({
    reducerPath: "transactionAPI",
    baseQuery: baseQueryWithClerk(getToken),
    tagTypes: ["transactions"],

    endpoints: (builder) => ({

        // Create Order
        createOrder: builder.mutation<ApiResponse, Order>({
            query: (order) => ({
                url: apiPaths.orders.root,
                method: "POST",
                body: order,
            }),
            invalidatesTags: ["transactions"]
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

        processOrder: builder
            .mutation<ApiResponse, { orderId: string, isCancelled?: boolean }>({
                query: ({ orderId, isCancelled }) => ({
                    url: `${apiPaths.orders.byId(orderId)}?isCancelled=${isCancelled}`,
                    method: "PUT"
                })
            })
    })
})

export const {
    useCreateOrderMutation,
    useAdminOrdersQuery,
    useGetOrderQuery,
    useProcessOrderMutation,
} = transactionAPI