// export type OrderItemType = {
//     name: string;
//     image: string;
//     price: number;
//     quantity: number;
//     _id: string;
// }

// export type AddressType = {
//     house: string;
//     street: string;
//     locality?: string;
//     city: string;
//     pinCode: string;
//     state: string;
//     country: string;
// }

// export type OrderType = {
//     name: string;
//     address: AddressType;
//     status: "Processing" | "Shipped" | "Delivered";
//     quantity: number;
//     subTotal: number;
//     discount: number;
//     shippingCharges: number;
//     tax: number;
//     totalAmount: number;
//     orderItems: OrderItemType[];
//     _id: string;
// };



export type PieChart = {
    userRoleDistribution: {
        admins: number;
        customers: number;
    };
    userAgeDistribution: {
        teenagers: number;
        adults: number;
        olds: number;
    };
    revenueDistribution: {
        netMargin: number;
        discount: any; productionCost: any;
        burnt: any;
        marketingCost: number;
    };
    stockAvailability: {
        inStock: number;
        outStock: number;
    };
    categories: Record<string, number>[];
    ordersFulfillment: {
        processing: number;
        shipping: number;
        delivered: number;
        canceled: number;
    };
}

export type BarChart = {
    users: number[];
    product: number[];
    orders: number[];
}

export type LineChart = {
    users: number[];
    product: number[];
    discount: number[];
    revenue: number[];
}