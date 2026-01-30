export type OrderItemType = {
    name: string;
    image: string;
    price: number;
    quantity: number;
    _id: string;
}

export type AddressType = {
    house: string;
    street: string;
    locality?: string;
    city: string;
    pinCode: string;
    state: string;
    country: string;
}

export type OrderType = {
    name: string;
    address: AddressType;
    status: "Processing" | "Shipped" | "Delivered";
    quantity: number;
    subTotal: number;
    discount: number;
    shippingCharges: number;
    tax: number;
    totalAmount: number;
    orderItems: OrderItemType[];
    _id: string;
};

