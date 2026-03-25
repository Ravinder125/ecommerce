import { createApi } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../../types/api.type";
import type { CartItem } from "../../types/cart.type";
import type { ShippingInfo } from "../../types/transaction.type";
import { apiPaths } from "../../utils/apiPath";
import { baseQueryWithAuth } from "./baseQueryWithAuth";

export const baseUrl = import.meta.env.VITE_BASE_URL

if (!baseUrl) {
    throw new Error("Base url is missing")
}
type CreatePaymentQuery = {
    items: CartItem[];
    shippingInfo: ShippingInfo;
    coupon: string | undefined
}

export const paymentAPI = createApi({
    reducerPath: "paymentAPI",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["Payments"],

    endpoints: (builder) => ({
        // Create Payment
        createPayment: builder.mutation<ApiResponse<{ clientSecret: string }>, CreatePaymentQuery>({
            query: (order) => ({
                url: apiPaths.payments.createPayment,
                method: "POST",
                body: order
            }
            ),
            invalidatesTags: ["Payments"]
        })
    })
})

export const {
    useCreatePaymentMutation
} = paymentAPI