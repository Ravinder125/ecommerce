
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




export interface BaseQuery {
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

export interface OrderItemType {
    name: string;
    price: number;
    quantity: number
    image: string;
}

export interface OrderItemBodyType extends OrderItemType {
    product: string
}

export interface NewOrderRequestBody {
    buyer: string;
    orderItem: OrderItemBodyType[];

    shippingInfo: {
        address: string;
        city: string;
        state: string;
        pinCode: string;
        country: string;
        phone: string;
    }

    paymentMethod: "COD" | "Card" | "UPI"
    paymentInfo?: {
        id: string;
        status: string;
    };

    subtotal: number;
    taxPrice: number;
    shippingCharge: number;
    totalPrice: number;
    discount: number;

    orderStatus?: "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

