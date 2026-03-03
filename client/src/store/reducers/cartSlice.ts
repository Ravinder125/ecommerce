import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ShippingInfo } from "../../types/transaction.type";
import type { CartItem, CartState } from "../../types/cart.type"

const InitialState: CartState = {
    items: [],
    coupon: undefined,
    discount: 0,
    loading: false,
    shippingCharges: 0,
    shippingInfo: {
        address: "",
        city: "",
        country: "",
        phone: "",
        state: "",
    },
    subtotal: 0,
    tax: 0,
    total: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: InitialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.loading = true;
            const index = state.items.findIndex(
                i => i.productId === action.payload.productId
            )

            if (index !== -1) {
                state.items[index] = {
                    ...state.items[index],
                    quantity: action.payload.quantity
                };
            } else {
                state.items.push(action.payload);
            }
            state.loading = false;
        },


        removeToCart: (state, action: PayloadAction<{ productId: string }>) => {
            state.loading = true;
            state.items = state.items
                .filter(i => i.productId !== action.payload.productId);

            state.loading = false;
        },

        calculatePrice: (state) => {
            const subtotal = state.items.reduce(
                (total, item) => total + item.price * item.quantity
                , 0)

            state.subtotal = subtotal;
            state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
            state.tax = Math.round(state.subtotal * 0.18);
            state.total =
                state.subtotal + state.shippingCharges + state.tax - state.discount;
        },

        discountApplied: (state, action: PayloadAction<number>) => {
            state.discount = action.payload;
        },

        saveCoupon: (state, action: PayloadAction<string>) => {
            state.coupon = action.payload;
        },

        saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
            state.shippingInfo = action.payload;
        },

        clearCart: () => InitialState,

    }
})

export const {
    clearCart,
    addToCart,
    removeToCart,
    calculatePrice,
    discountApplied,
    saveCoupon,
    saveShippingInfo,
} = cartSlice.actions

export default cartSlice.reducer;