export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled"

export type Ratio = {
    male: number;
    female: number;
}

export type ModifiedLatestTransactions = {
    _id: string;
    orderItems: number;
    status: OrderStatus;
    discount: number;
    total: number;
}

export type Category = Record<string, number>

export type Growth = {
    products: number;
    orders: number;
    users: number;
    revenue: number;
}

export type Count = {
    products: number;
    orders: number;
    users: number;
    revenue: number;
}

export type DashboardCharts = {
    order: number[];
    revenue: number[]
}

export type DashboardStats = {
    ratio: Ratio;
    modifiedLatestTransactions: ModifiedLatestTransactions[];
    categories: Category[];
    growth: Growth;
    count: Count;
    charts: DashboardCharts;
}