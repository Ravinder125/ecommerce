
import type z from "zod";
import type { newOrderSchema, orderItemSchema, orderSchema, orderStatusSchema, paymentInfoSchema, paymentMethodSchema, shippingInfoSchema } from "../validations/orderDataSchema";

// export type OrderItem = {
//     product: string
//     name: string
//     image: string
//     price: number
//     quantity: number
// }

// export type ShippingInfo = {
//     address: string;
//     city: string;
//     state: string;
//     country: string;
//     phone: string;
//     pinCode: number;
// }

// export type PaymentInfo = {
//     id: string
//     status: "succeeded" | "pending" | "failed"
// }

// export type OrderStatus =
//     | "Processing"
//     | "Shipped"
//     | "Delivered"
//     | "Cancelled"


// export type Order = {
//     _id: string;

//     buyer: string;

//     orderItem: OrderItem[];

//     shippingInfo: ShippingInfo;

//     paymentMethod: "Card" | "COD" | "UPI";

//     paymentInfo: PaymentInfo;

//     orderStatus: OrderStatus;

//     subtotal: number;
//     taxPrice: number;
//     shippingCharge: number;
//     discount: number;
//     totalPrice: number;
//     quantity: number;

//     deliveredAt: string | null;

//     createdAt: string;
//     updatedAt: string;
// }

export type OrderItem = z.infer<typeof orderItemSchema>;
export type ShippingInfo = z.infer<typeof shippingInfoSchema>;
export type PaymentInfo = z.infer<typeof paymentInfoSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type OrderStatus = z.infer<typeof orderStatusSchema>;
export type Order = z.infer<typeof orderSchema>;
export type NewOrder = z.infer<typeof newOrderSchema>; 
