// src/constants/apiPaths.ts
import type { ApiPaths } from '../types/api.type'

export const apiPaths = {
    // auth: {
    //     profile: "/auth/profile",
    // },

    users: {
        syncProfile: "/users/sync-profile",
        profile: "/users/profile",
        allUsers: "/users/all",
        byId: (id: string) => `/users/${id}`,
    },

    products: {
        root: "/products",
        admin: "/products/admin",
        latest: "/products/latest",
        categories: "/products/categories",
        byId: (id: string) => `/products/${id}`,
        updateImages: (id: string) => `/products/${id}`,
    },

    orders: {
        root: "/orders",
        admin: "/orders/admin",
        byId: (id: string) => `/orders/${id}`,
    },

    coupons: {
        root: "/orders/coupon",
        byId: (id: string) => `/orders/coupon/${id}`,
        applyDiscount: "/orders/discount",
    },

    dashboard: {
        stats: "/dashboard/stats",
        pie: "/dashboard/pie",
        bar: "/dashboard/bar",
        line: "/dashboard/line",
    },

    payments: {
        root: "/payments",
    },
} as const satisfies ApiPaths;

// read - only safety