import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import type { ApiResponse } from "../types/api.type"
import type { SerializedError } from "@reduxjs/toolkit"
import { type NavigateFunction } from "react-router-dom"
import toast from "react-hot-toast"

type ResType<T> =
    | {
        data: ApiResponse<T>
    }
    | {
        error: FetchBaseQueryError | SerializedError;
    }

export const ReduxResponseHandle = <T = null>(
    res: ResType<T>,
    navigate?: NavigateFunction | null,
    url?: string | null,
    returnData: boolean = false,
) => {
    console.log("working")
    if ("data" in res) {
        toast.success(res.data.message!)
        if (navigate && url?.trim()) navigate(url)
        else if (returnData) return res.data.data

    } else {
        const error = res.error as FetchBaseQueryError;
        const messageResponse = error.data as ApiResponse<T>;
        throw new Error(messageResponse.message)
    }
}

// toast.error(messageResponse.message!);
