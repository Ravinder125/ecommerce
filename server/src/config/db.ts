import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const DB_URI = process.env.DB_URI
        await mongoose.connect(
            DB_URI as string, { dbName: "ecommerce" }
        );
        console.log('✅ DB connected successfully');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("❌ DB connection failed:", error.message)
        }
        console.error('❌ DB connection failed:', error);
        console.log("❌ DB connection failed:", error)
        process.exit(1)
        throw error
    }
}