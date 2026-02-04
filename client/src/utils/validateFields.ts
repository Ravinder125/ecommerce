import type { ZodSchema } from "zod";

type ValidationResponse<T> = {
    success: boolean,
    message?: string,
    data?: null | T
}

export const validateData = <T>(
    schema: ZodSchema<T>,
    payload: T
): ValidationResponse<T> => {
    const result = schema.safeParse(payload);

    if (!result.success) {
        const message =
            result.error.issues[0]?.message ?? "Validation failed";

        return {
            success: result.success,
            data: null,
            message: message
        }
    }

    return {
        success: result.success,
        data: result.data,
        message: "Data is validated"
    };
};
