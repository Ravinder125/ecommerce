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
    price?: number;
    search?: string;
    category?: string;
    sort?: string
    page?: string;
}


export interface BaseQuery {
    name?: {
        $regex: string;
        $options: string;
    };
    price?: { $lte: number };
    category?: string;
}