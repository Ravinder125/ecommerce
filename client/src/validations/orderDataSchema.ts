import { z } from "zod";

/* ORDER ITEM */
export const orderItemSchema = z.object({
    product: z.string().min(1, "Product ID is required"),
    name: z.string(),
    price: z.number().min(0),
    quantity: z.number().min(1),
    image: z.string().url(),
});

/* SHIPPING INFO */
export const shippingInfoSchema = z.object({
    address: z.string().min(3),
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().min(2),
    phone: z.string().min(8),
    pinCode: z.number().min(3).max(10),
});

/* PAYMENT INFO */
export const paymentInfoSchema = z.object({
    id: z.string().trim(),
    status: z.enum(["succeeded", "pending", "failed"]),
});

/* ENUMS */
export const paymentMethodSchema = z.enum(["COD", "Card", "UPI"]);

export const orderStatusSchema = z.enum([
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
]);

/* ORDER */
export const orderSchema = z.object({
    buyer: z.string().min(1),

    orderItem: z.array(orderItemSchema).min(1),

    shippingInfo: shippingInfoSchema,

    paymentMethod: paymentMethodSchema,

    paymentInfo: paymentInfoSchema,

    subtotal: z.number().min(0),
    taxPrice: z.number().min(0),
    shippingCharge: z.number().min(0),
    totalPrice: z.number().min(0),
    discount: z.number().min(0).default(0),

    orderStatus: orderStatusSchema.default("Processing"),
});

