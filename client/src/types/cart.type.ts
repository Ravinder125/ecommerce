import type { ShippingInfo } from "./transaction.type";

export type CartItem = {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
}

export type CartState = {
    items: CartItem[];
    loading: boolean;
    subtotal: number;
    total: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    coupon: string | undefined;
    shippingInfo: ShippingInfo;
}