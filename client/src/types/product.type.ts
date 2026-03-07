export type Product = {
    _id: string;
    name: string;
    price: number;
    brand: string;
    images: string[];
    category: string;
    stock: number;
    description: string;
    owner: string;
    sold: number;
    ratings: number;
    numOfReviews: number;
    reviews: Review[];
    createdAt: Date;
    updatedAt: Date;
}

export type Review = {
    user: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

// export type NewProductFormData = {
//     name: string,
//     price: number,
//     stock: number,
//     image: string | null | ArrayBuffer,
//     category: string,
//     brand: string,
//     description: string,
// }
