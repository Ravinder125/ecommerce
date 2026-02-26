import z from "zod";

export const productDataSchema = z.object({
    name: z
        .string()
        .trim()
        .nonempty({ message: "Name is required" }),
    price: z
        .number()
        .min(1, { message: "Price cannot be lower than 1" })
        .nonnegative({ message: "Price cannot be empty" }),
    stock: z
        .number()
        .min(1, { message: "stock cannot be lower than 1" })
        .nonnegative({ message: "Price cannot be empty" }),
    image: z
        .string()
        .nonempty({ message: "Image is required" }),
    category: z
        .string()
        .trim()
        .nonempty({ message: "Category is requird" }),
    brand: z
        .string()
        .trim()
        .nonempty({ message: "Category is requird" }),
    description: z
        .string()
        .trim()
        .nonempty({ message: "Description is required" })
})

export const imageSchema = z.object({
    image: z
        .any()
        .refine((file) => file instanceof File, {
            message: "Image is required"
        })
        .refine((file) => file?.size >= 6250, {
            message: "File is too small (min 6kb)",
        })
        .refine((file) => file?.size <= 6000000, {
            message: "File is too large (max 6MB)"
        })
        .refine((file) =>
            ["image/jpg", "image/jpeg", "image/png", "image/webp"].indexOf(file?.type) !== -1,
            { message: "Only JPG, PNG, or WEBP image are allowed" }
        )
})

