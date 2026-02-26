export type OrderItem = {
    productId: string
    name: string
    photo: string
    price: number
    quantity: number
}

export type ShippingInfo = {
    address: string
    city: string
    state: string
    country: string
    phone: string
}

export type PaymentInfo = {
    id: string
    status: "succeeded" | "pending" | "failed"
}

export type OrderStatus =
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled"


export type Order = {
    _id: string;

    buyer: string;

    orderItem: OrderItem[];

    shippingInfo: ShippingInfo;

    paymentMethod: "Card" | "COD" | "UPI";

    paymentInfo: PaymentInfo;

    orderStatus: OrderStatus;

    subtotal: number;
    taxPrice: number;
    shippingCharge: number;
    discount: number;
    totalPrice: number;
    quantity: number;

    deliveredAt: string | null;

    createdAt: string;
    updatedAt: string;
}