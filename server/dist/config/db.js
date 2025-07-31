import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        const DB_URI = process.env.DB_URI;
        const connectionInstance = await mongoose.connect(DB_URI, { dbName: "ecommerce" });
        return connectionInstance;
    }
    catch (error) {
        console.error("DB connection failed:", error);
        process.exit(1);
    }
};
