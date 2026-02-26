import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithClerk } from "./baseQueryWithAuth";
import { getToken } from "../../utils/tokenManager";
import type { ApiResponse } from "../../types/api.type";
import type { DashboardStats } from "../../types/dashboard.type";
import { apiPaths } from "../../utils/apiPath";


export const statsAPI = createApi({
    reducerPath: "statsAPI",
    baseQuery: baseQueryWithClerk(getToken),
    // tagTypes: ["Dashboard"],

    endpoints: (builder) => ({

        // GET Dashboard Data
        dashboard: builder.query<ApiResponse<DashboardStats>, void>({
            query: () => ({
                url: apiPaths.dashboard.stats,
                method: "GET",

            })
        }),

        dashboardPieChart: builder.query<ApiResponse<DashboardStats>, void>({
            query: () => ({
                url: apiPaths.dashboard.pie,
                method: "GET",

            })
        }),

        dashboardBarChart: builder.query<ApiResponse<DashboardStats>, void>({
            query: () => ({
                url: apiPaths.dashboard.bar,
                method: "GET",

            })
        }),

        dashboardLineChart: builder.query<ApiResponse<DashboardStats>, void>({
            query: () => ({
                url: apiPaths.dashboard.line,
                method: "GET",

            })
        }),
    })

})

export const {
    useDashboardBarChartQuery,
    useDashboardLineChartQuery,
    useDashboardPieChartQuery,
    useDashboardQuery,
} = statsAPI