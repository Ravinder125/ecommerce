import { createClient } from 'redis';
import dotenv from 'dotenv';
// import nodeCache from 'node-cache'
dotenv.config();

// export const redisClient = new nodeCache();

// redisClient.on("connect", () => console.log("connected"))
// redisClient.on("error", (error) => console.log("failed: ", error))

const redisURL = process.env.REDIS_URL
// const redisLocalURL = "redis://localhost:6379"

export const redisClient = createClient({
    url: redisURL
});

export const connectToRedis = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
            console.log('✅ Redis connected');
        }
    } catch (error) {
        console.error('❌ Redis connection failed:', error);
    }
};



