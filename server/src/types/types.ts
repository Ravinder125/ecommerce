import { Types } from 'mongoose'
import { IOrder, IOrderItem } from '../models/order.models.js';
export interface RegisterUserRequestBody {
    name: string;
    email: string;
    avatar: string;
    gender: string;
    role: string;
    _id: string;
    dob: Date;
}

export interface CreateProductRequestBody {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    brand: string;
}

export type RequestProductQuery = {
    maxPrice?: number;
    search?: string;
    category?: string;
    sort?: "asc" | "desc";
    page?: string;
    limit?: string;
}




export type BaseQuery ={
    name?: {
        $regex: string;
        $options: string;
    };
    price?: { $lte: number };
    category?: string;
}

export interface InvalidateCacheProps {
    product?: boolean;
    order?: boolean;
    admin?: boolean;
}
export type PaymentMethod = "COD" | "Card" | "UPI"

export type PaymentStatus = "Succeeded" | "Failed" | "Processing";

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";


export type NewOrderRequestBody = {
    orderItems: IOrderItem[];

    shippingInfo: {
        address: string;
        city: string;
        state: string;
        pinCode: string;
        country: string;
        phone: string;
    }

    paymentMethod: PaymentMethod
    paymentInfo?: {
        id: string;
        status: PaymentStatus
    };

    subtotal: number;
    tax: number;
    shippingCharges: number;
    total: number;
    discount: number;

}
