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