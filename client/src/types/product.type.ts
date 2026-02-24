export interface Product {
    _id: string;
    name: string;
    price: number;
    brand: string;
    images: string[];
    category: string;
    stock: number;
}

export type NewProductFormData = {
    name: string,
    price: number,
    stock: number,
    image: string | null | ArrayBuffer,
    category: string,
    brand: string,
}
