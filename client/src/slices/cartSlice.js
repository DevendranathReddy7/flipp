import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtil';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItem: [] }

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            const existItem = state.cartItem.find((x) => x._id === item._id)

            if (existItem) {
                state.cartItem = state.cartItem.map((x) => x._id === existItem._id ? item : x)
            } else {
                state.cartItem = [...state.cartItem, item]
            }

            return updateCart(state)
        },
        removeFromCart: (state, action) => {
            const item = action.payload
            state.cartItem = state.cartItem.filter((x) => x._id !== item._id)
            return updateCart(state)
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer