import z from "zod";

export const imageSchema = z
    .file()
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
    ).optional()


export const productDataSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Name is required" }),

    price: z
        .number()
        .min(1, { message: "Price cannot be lower than 1" }),

    stock: z
        .number()
        .min(1, { message: "Stock cannot be lower than 1" }),

    image: imageSchema,

    category: z
        .string()
        .trim()
        .min(1, { message: "Category is required" }),

    brand: z
        .string()
        .trim()
        .min(1, { message: "Brand is required" }),

    description: z
        .string()
        .trim()
        .min(1, { message: "Description is required" })
})

export const updateProductDataSchema = z.object({
    name: z
        .string()
        .trim()
        .optional(),

    price: z
        .number()
        .optional(),

    stock: z
        .number()
        .optional(),

    image: imageSchema,

    category: z
        .string()
        .trim()
        .optional(),

    brand: z
        .string()
        .trim()
        .optional(),

    description: z
        .string()
        .trim()
        .optional(),
})



export type NewProductFormData = z.infer<typeof productDataSchema>
export type UpdateProductFormData = z.infer<typeof updateProductDataSchema>