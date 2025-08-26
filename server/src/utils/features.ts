import { Product } from "../models/product.models.js";
import { OrderItemBodyType } from "../types/types.js";

export const reduceStock = async (orderItem: OrderItemBodyType[]) => {
    const res = await Promise.all(
        orderItem.map((order => {
            Product.findByIdAndUpdate(
                order.product,
                { $inc: { stock: - Number(order.quantity) } }
            )
        }))
    )
    return res;
}