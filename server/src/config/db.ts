import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

export const connectDB = async () => {
    try {
        const DB_URI = process.env.DB_URI
        await mongoose.connect(
            DB_URI as string, { dbName: DB_NAME }
        );
        console.log('✅ DB connected successfully');
    } catch (error: any) {
        console.error('❌ DB connection failed:', error);
        process.exit(1)
    }
}