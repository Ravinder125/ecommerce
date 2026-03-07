import mongoose from 'mongoose';

export interface ICoupon extends Document {
    code: string;
    amount: number;
}

const CouponSchema = new mongoose.Schema<ICoupon>({
    code: {
        type: String,
        required: [true, "Discount coupon is required"]
    },
    amount: {
        type: Number,
        required: [true, "Discount amount is required"]
    }
})
export const Coupon = mongoose.model<ICoupon>("Coupon", CouponSchema)