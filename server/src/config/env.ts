import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({

    PORT: z.string().default("5000"),

    DB_URI: z.string(),

    CLOUD_NAME: z.string(),

    CLOUDINARY_API_KEY: z.string(),

    CLOUDINARY_API_SECRET: z.string(),

    PRODUCT_PER_PAGE:
        z.coerce.number(),

    REDIS_URL:
        z.string().optional(),

    UPSTASH_REDIS_REST_URL:
        z.string().optional(),

    UPSTASH_REDIS_REST_TOKEN:
        z.string().optional(),

    MARKETING_COST:
        z.coerce.number(),

    STRIPE_SECRET_KEY:
        z.string(),

    FIREBASE_PROJECT_ID:
        z.string(),

    FIREBASE_CLIENT_EMAIL:
        z.string(),

    FIREBASE_PRIVATE_KEY:
        z.string()

});

const safeParse = z.safeParse(envSchema, process.env)
if (!safeParse.success) {
    const errorMessage = safeParse.error.message
    throw new Error(errorMessage)
}

const env = safeParse.data


const firebaseEnv = {

    projectId:
        env.FIREBASE_PROJECT_ID,

    clientEmail:
        env.FIREBASE_CLIENT_EMAIL,

    privateKey:
        env.FIREBASE_PRIVATE_KEY
            .replace(/\\n/g, "\n")
}


export {
    env,
    firebaseEnv
}