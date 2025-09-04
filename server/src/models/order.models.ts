import mongoose, { Schema, Types } from 'mongoose';
import { NewOrderRequestBody, OrderItemType } from '../types/types.js';

export interface IOrderItemType extends OrderItemType {
    product: Types.ObjectId;
}

export interface IOrder extends Document, NewOrderRequestBody {
    deliveredAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    _id: Types.ObjectId
}

const OrderItemSchema = new mongoose.Schema<IOrderItemType>({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product ID is required"],
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true
    },
}, { _id: false })

const OrderSchema = new mongoose.Schema<IOrder>(
    {
        buyer: {
            type: String,
            required: true,
            trim: true,
        },
        orderItem: [OrderItemSchema],
        shippingInfo: {
            address: {
                type: String,
                required: [true, "Address 1 is required"],
            },
            city: {
                type: String,
                required: [true, "City is required"],
            },
            state: {
                type: String,
                required: [true, "City is required"],
            },
            country: {
                type: String,
                required: [true, "City is required"],
            },
            phone: {
                type: String,
                required: [true, "City is required"],
            },
        },
        paymentMethod: {
            type: String,
            enum: ["COD", "Card", "UPI"],
            required: [true, "Payment method is required"]
        },
        paymentInfo: {
            id: {
                type: String,
                trim: true,
            },
            status: String
        },
        subtotal: {
            type: Number,
            required: [true, "Items price is required"],
        },
        discount: {
            type: Number,
            default: 0,
        },
        taxPrice: {
            type: Number,
            required: [true, "Tax price is required"]
        },
        shippingCharge: {
            type: Number,
            default: 0
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        orderStatus: {
            type: String,
            enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
            default: ["Processing"]
        },
        deliveredAt: Date,
    }, { timestamps: true })


export const Order = mongoose.model<IOrder>("Order", OrderSchema)