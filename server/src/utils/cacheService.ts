import { redisClient } from "../config/redis.js"
import { Product } from "../models/product.models.js";
import { InvalidateCacheProps } from "../types/types.js";

export const cache = {
    get: async (key: string) => {
        const data: any = await redisClient.get(key);
        return data ? JSON.parse(data) : null
    },
    set: async (key: string, data: any, ttl: number = 3600) => {
        await redisClient.set(key, JSON.stringify(data), { EX: ttl })
    },
    del: async (key: string | string[]) => {
        await redisClient.del(key)
        console.log("successfully deleted")
    }
}

export const invalidateCache = async ({
    product,
    order,
    admin
}: InvalidateCacheProps
) => {
    if (product) {
        const products = await Product.find({}).select("_id");
        const productKeys: string[] = [
            "categories",
            "latest-products",
            "alsdfjsd"
        ];
        products.forEach(i => {
            productKeys.push(`product:${i._id}`)
        })
        await cache.del(productKeys);
    }
    if (order) {

    }
    if (admin) {

    }
}