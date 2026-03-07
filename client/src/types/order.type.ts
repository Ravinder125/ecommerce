// import type { CartItem } from "./cart.type";
// import type { ShippingInfo } from "./transaction.type";

// export type OrderItem = Omit<CartItem, "productId"> & {
//     product: string;
// }

// export type PaymentMethod = "COD" | "Card" | "UPI"
// export type PaymentInfo = { id: string, status: string }
// export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

// export type Order = {
//     buyer: string;
//     orderItem: OrderItem[];
//     shippingInfo: ShippingInfo;
//     paymentMethod: PaymentMethod,
//     paymentInfo: {
//         id: {
//             type: String,
//             trim: true,
//         },
//         status: String
//     },
//     subtotal: number;
//     taxPrice: number;
//     shippingCharge: number;
//     totalPrice: number;
//     discount: number;

//     orderStatus: OrderStatus;
// }
