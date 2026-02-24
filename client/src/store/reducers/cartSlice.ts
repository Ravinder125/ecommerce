import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    productId: string
    name: string
    price: number
    image: string
    stock: number
}

export type CartState = {
    items: CartItem[]
}

const InitialState: CartState = {
    items: [],
    // stock: 0,
    // isLoading: false,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: InitialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const item = state.items.find(
                i => i.productId === action.payload.productId
            )

            if (item) {
                item.stock++
            } else {
                state.items.push(action.payload)
            }
        },

        clearCart(state) {
            state.items = []
            // state.stock = 0
            // state.isLoading = false
        },

        // addToCart(state, action) {
        //     state.items = [...state.items, action.payload]
        //     state.isLoading = false
        // },

        removeToCart(state, action: PayloadAction<CartItem>) {
            state.items = state.items
                .filter(i => i.productId !== action.payload.productId);
            // state.isLoading = false;
            // state.stock = state.stock - state.items
            // .find(i => i._id === action.payload._id)
            // ?.stock!
        },

    }
})

export const { clearCart, addToCart, removeToCart } = cartSlice.actions

export default cartSlice.reducer;