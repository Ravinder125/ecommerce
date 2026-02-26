import { Product } from "../models/product.models.js";
import { OrderItemBodyType } from "../types/types.js";

export const reduceStock = async (orderItem: OrderItemBodyType[]) => {
    const res = await Promise.all(
        orderItem.map((order => {
            Product.findByIdAndUpdate(
                order.product,
                {
                    $inc: {
                        stock: - Number(order.quantity)
                    }
                })
        }))
    )
    return res;
}

export const increment = (current: number, prev: number): number => {
    if (prev === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - prev) / prev) * 100);
};

export const getInventory = async (categories: string[]): Promise<Record<string, number>[]> => {
    const categoriesCount = await Promise.all(categories.map(c =>
        Product.countDocuments({ category: c })
    ))

    return categories.map((c, i) => ({ [c]: categoriesCount[i] }))
}

interface MyDocument extends Document {
    createdAt: Date;
    discount?: number;
    totalPrice?: number
}

type GetDataByMonthsProps = {
    length: number,
    today: Date
    docArray: MyDocument[],
    property?: "discount" | "totalPrice"
}

export const getBarChartData = ({ length, today, docArray, property }: GetDataByMonthsProps) => {
    const data: number[] = new Array(length).fill(0);

    docArray.forEach((order) => {
        const creationDate = order.createdAt
        const monthDiff = (today.getMonth() - creationDate.getMonth()
            + 12) % 12;

        if (monthDiff < length) {
            if (property) {
                data[length - monthDiff - 1] += order[property]!;
            } else {
                data[length - monthDiff - 1] += 1;
            }
        }

    })

    return data

}