import { IOrderItem } from "../modules/order/order.model.js";

export type UserRole = "user" | "admin";

export type BaseQuery = {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: { $lte: number };
  category?: string;
};

export interface InvalidateCacheProps {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
}
export type PaymentMethod = "COD" | "Card" | "UPI";

export type PaymentStatus = "Succeeded" | "Failed" | "Processing";

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type NewOrderRequestBody = {
  orderItems: IOrderItem[];

  shippingInfo: {
    address: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
    phone: string;
  };

  paymentMethod: PaymentMethod;
  paymentInfo?: {
    id: string;
    status: PaymentStatus;
  };

  subtotal: number;
  tax: number;
  shippingCharges: number;
  total: number;
  discount: number;
};
