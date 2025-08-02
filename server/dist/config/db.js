import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        const DB_URI = process.env.DB_URI;
        await mongoose.connect(DB_URI, { dbName: "ecommerce" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("DB connection failed:", error.message);
        }
        console.log("Db connection failed", error);
        process.exit(1);
    }
};
