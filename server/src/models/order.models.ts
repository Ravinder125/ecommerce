import mongoose, { Schema, Types } from 'mongoose';
import { NewOrderRequestBody, OrderStatus } from '../types/types.js';

export interface IOrder extends Document, NewOrderRequestBody {
    _id: Types.ObjectId;
    buyer: Types.ObjectId,
    deliveredAt: Date;
    orderStatus?: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface IOrderItem {
    productId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number
    image: string;
}


export interface IShippingInfo {
    address: string,
    city: string,
    state: string,
    country: string,
    phone: string;
    pinCode: number;
}

export const ShippingSchema = new mongoose.Schema<IShippingInfo>({
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
    pinCode: {
        type: Number,
        required: [true, "Pin Code is required"]
    }
}, { _id: false })


const OrderItemSchema = new mongoose.Schema<IOrderItem>({
    productId: {
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
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderItems: [OrderItemSchema],
        shippingInfo: ShippingSchema,
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
            status: {
                type: String,
                enum: ["Succeeded", "Failed", "Processing"],
                default: "Processing"
            }
        },
        subtotal: {
            type: Number,
            required: [true, "Items price is required"],
        },
        discount: {
            type: Number,
            default: 0,
        },
        tax: {
            type: Number,
            required: [true, "Tax price is required"]
        },
        shippingCharges: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            required: true,
        },
        orderStatus: {
            type: String,
            enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Processing"
        },
        deliveredAt: Date,
    }, { timestamps: true })


export const Order = mongoose.model<IOrder>("Order", OrderSchema)