import { redisClient } from "../config/redis.js";
import { Product } from "../modules/product/product.model.js";
import { InvalidateCacheProps } from "../types/types.js";

export const cache = {
  get: async (key: string) => {
    const data: any = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  },
  set: async (key: string, data: any, ttl: number = 3600) => {
    await redisClient.set(key, JSON.stringify(data), { EX: ttl });
  },
  del: async (key: string | string[]) => {
    await redisClient.del(key);
    console.log("successfully deleted");
  },
};

export const invalidateCache = async ({
  product,
  order,
  admin,
}: InvalidateCacheProps) => {
  if (product) {
    const products = await Product.find({}).select("_id");
    const productKeysArr: string[] = ["categories", "latests-products"];
    products.forEach((i) => {
      productKeysArr.push(`product:${i._id}`);
    });
    await cache.del(productKeysArr);
  }
  if (order) {
  }
  if (admin) {
  }
};
