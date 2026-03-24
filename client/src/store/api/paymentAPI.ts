import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../../types/api.type";
import type { CartItem } from "../../types/cart.type";
import type { ShippingInfo } from "../../types/transaction.type";
import { apiPaths } from "../../utils/apiPath";

export const baseUrl = import.meta.env.VITE_BASE_URL

if (!baseUrl) {
    throw new Error("Base url is missing")
}
type CreatePaymentQuery = {
    items: CartItem[];
    shippingInfo: ShippingInfo;
    coupon: string | undefined
    id: string;
}

export const paymentAPI = createApi({
    reducerPath: "paymentAPI",
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    tagTypes: ["Payments"],

    endpoints: (builder) => ({
        // Create Payment
        createPayment: builder.mutation<ApiResponse<{ clientSecret: string }>, CreatePaymentQuery>({
            query: (order) => {
                const orderData: Omit<CreatePaymentQuery, "id"> = {
                    items: order.items,
                    shippingInfo: order.shippingInfo,
                    coupon: order.coupon
                }

                return {
                    url: `${apiPaths.payments.createPayment}/?id=${order.id}`,
                    method: "POST",
                    body: orderData
                }
            },
            invalidatesTags: ["Payments"]
        })
    })
})

export const {
    useCreatePaymentMutation
} = paymentAPI